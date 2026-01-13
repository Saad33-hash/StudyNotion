import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoChevronBack, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { apiConnector } from "../Services/apiConnector";
import toast from "react-hot-toast";

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  // State
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentSubSection, setCurrentSubSection] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [completedLectures, setCompletedLectures] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, reviews: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  // Fetch course data from localStorage OR API
  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        // First, try to get from localStorage
        const enrolledCourses = localStorage.getItem("enrolledCourses");
        let course = null;

        if (enrolledCourses) {
          const courses = JSON.parse(enrolledCourses);
          course = courses.find((c) => c._id === courseId);
        }

        // If not in localStorage, fetch from API
        if (!course) {
          console.log("Course not in localStorage, fetching from API...");
          const response = await apiConnector(
            "GET",
            `${process.env.REACT_APP_BASE_URL}/Courseroutes/getCourseDetails/${courseId}`
          );

          if (response.data.success && response.data.data) {
            course = response.data.data;

            // Save to localStorage for future use
            const existingEnrolled = localStorage.getItem("enrolledCourses")
              ? JSON.parse(localStorage.getItem("enrolledCourses"))
              : [];

            // Add course if not already there
            if (!existingEnrolled.find((c) => c._id === courseId)) {
              existingEnrolled.push({
                ...course,
                progressPercentage: 0,
                enrolledAt: new Date().toISOString(),
              });
              localStorage.setItem("enrolledCourses", JSON.stringify(existingEnrolled));
            }
          }
        }

        if (course) {
          setCourseData(course);
          // Set first section and subsection as default
          if (course.courseContent?.length > 0) {
            const firstSection = course.courseContent[0];
            setCurrentSection(firstSection);
            setExpandedSections({ [firstSection._id]: true });
            if (firstSection.subSection?.length > 0) {
              setCurrentSubSection(firstSection.subSection[0]);
            }
          }
        }

        // Load completed lectures from database API
        try {
          const progressResponse = await fetch(
            `${process.env.REACT_APP_BASE_URL}/profile/getCourseProgress/${courseId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const progressResult = await progressResponse.json();
          if (progressResult.success && progressResult.completedVideos) {
            setCompletedLectures(progressResult.completedVideos);
          }
        } catch (progressError) {
          console.log("Error fetching progress:", progressError);
        }
      } catch (error) {
        console.log("Error fetching course:", error);
      }
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId, token]);

  // Calculate total lectures
  const getTotalLectures = () => {
    if (!courseData?.courseContent) return 0;
    let total = 0;
    courseData.courseContent.forEach((section) => {
      total += section.subSection?.length || 0;
    });
    console.log("Total lectures calculated:", total);
    return total;
  };

  // Check if all lectures are completed
  const isAllCompleted = () => {
    const total = getTotalLectures();
    return total > 0 && completedLectures.length >= total;
  };

  // Toggle section expand/collapse
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Handle lecture click
  const handleLectureClick = (section, subSection) => {
    setCurrentSection(section);
    setCurrentSubSection(subSection);
  };

  // Mark lecture as complete - calls database API
  const markLectureComplete = async (subSectionId) => {
    if (!completedLectures.includes(subSectionId)) {
      // Optimistic update for UI
      const updated = [...completedLectures, subSectionId];
      setCompletedLectures(updated);

      console.log("Lecture marked complete:", subSectionId);

      // Call API to save progress to database
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/profile/updateCourseProgress`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              courseId: courseId,
              subSectionId: subSectionId,
            }),
          }
        );
        const result = await response.json();
        console.log("Progress saved to database:", result);
      } catch (error) {
        console.log("Error saving progress:", error);
      }
    }
  };

  // Handle video end - auto mark complete and play next
  const handleVideoEnd = () => {
    // Mark current lecture as complete
    if (currentSubSection) {
      markLectureComplete(currentSubSection._id);
    }

    // Find and play next lecture
    playNextLecture();
  };

  // Play next lecture
  const playNextLecture = () => {
    if (!courseData?.courseContent || !currentSection || !currentSubSection) return;

    const currentSectionIndex = courseData.courseContent.findIndex(
      (s) => s._id === currentSection._id
    );
    const currentSubIndex = currentSection.subSection.findIndex(
      (sub) => sub._id === currentSubSection._id
    );

    // Try next subsection in current section
    if (currentSubIndex < currentSection.subSection.length - 1) {
      setCurrentSubSection(currentSection.subSection[currentSubIndex + 1]);
      return;
    }

    // Try first subsection of next section
    if (currentSectionIndex < courseData.courseContent.length - 1) {
      const nextSection = courseData.courseContent[currentSectionIndex + 1];
      setCurrentSection(nextSection);
      setExpandedSections((prev) => ({ ...prev, [nextSection._id]: true }));
      if (nextSection.subSection?.length > 0) {
        setCurrentSubSection(nextSection.subSection[0]);
      }
    }
  };

  // Calculate section duration
  const getSectionDuration = (section) => {
    if (!section?.subSection) return "0m";
    let totalMinutes = 0;
    section.subSection.forEach((sub) => {
      totalMinutes += parseInt(sub.duration || 0);
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0 && minutes === 0) return "30m";
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  // Handle review submission
  const handleSubmitReview = async () => {
    if (reviewData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewData.reviews.trim()) {
      toast.error("Please write a review");
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/Courseroutes/createRating`,
        {
          rating: reviewData.rating,
          reviews: reviewData.reviews,
          courseId: courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setShowReviewModal(false);
        setReviewData({ rating: 0, reviews: "" });
      } else {
        toast.error(response.data.message || "Failed to submit review");
      }
    } catch (error) {
      console.log("Review error:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
    setSubmittingReview(false);
  };

  // Star rating component
  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-2xl transition-transform hover:scale-110"
          >
            {star <= rating ? (
              <AiFillStar className="text-yellow-50" />
            ) : (
              <AiOutlineStar className="text-richblack-400" />
            )}
          </button>
        ))}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-richblack-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
      </div>
    );
  }

  // Course not found
  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-900 gap-4">
        <p className="text-xl text-richblack-300">Course not found</p>
        <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg"
        >
          Go to Enrolled Courses
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-richblack-900">
      {/* Sidebar */}
      <div className="w-[320px] min-w-[320px] bg-richblack-800 border-r border-richblack-700 flex flex-col h-screen overflow-hidden">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="flex items-center gap-2 p-4 text-richblack-300 hover:text-richblack-5 border-b border-richblack-700"
        >
          <IoChevronBack className="text-lg" />
          <span>Back to Enrolled Courses</span>
        </button>

        {/* Course Title & Progress */}
        <div className="p-4 border-b border-richblack-700">
          <h2 className="text-lg font-semibold text-richblack-5 mb-2">
            {courseData.courseName}
          </h2>
          <p
            className={`text-sm ${isAllCompleted() ? "text-caribbeangreen-300" : "text-richblack-300"
              }`}
          >
            {completedLectures.length} of {getTotalLectures()} completed
          </p>

          {/* Add Review Button - Shows when all completed */}
          {isAllCompleted() && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="mt-3 w-full py-2 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all text-sm"
            >
              Add Review
            </button>
          )}
        </div>

        {/* Sections List */}
        <div className="flex-1 overflow-y-auto">
          {courseData.courseContent?.map((section) => (
            <div key={section._id} className="border-b border-richblack-700">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section._id)}
                className="w-full flex items-center justify-between p-4 hover:bg-richblack-700 transition-all"
              >
                <div className="flex items-center gap-2">
                  {expandedSections[section._id] ? (
                    <IoChevronDown className="text-richblack-300" />
                  ) : (
                    <IoChevronUp className="text-richblack-300" />
                  )}
                  <span className="text-richblack-5 font-medium text-left">
                    {section.sectionName}
                  </span>
                </div>
                <span className="text-richblack-400 text-sm">
                  {getSectionDuration(section)}
                </span>
              </button>

              {/* SubSections */}
              {expandedSections[section._id] && (
                <div className="bg-richblack-900">
                  {section.subSection?.map((subSection) => {
                    const isCompleted = completedLectures.includes(subSection._id);
                    const isActive = currentSubSection?._id === subSection._id;

                    return (
                      <button
                        key={subSection._id}
                        onClick={() => handleLectureClick(section, subSection)}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${isActive
                          ? "bg-yellow-800/30 border-l-4 border-yellow-50"
                          : "hover:bg-richblack-800"
                          }`}
                      >
                        {/* Checkbox */}
                        {isCompleted ? (
                          <BsCheckCircleFill className="text-caribbeangreen-300 flex-shrink-0" />
                        ) : (
                          <BsCircle className="text-richblack-400 flex-shrink-0" />
                        )}

                        {/* Lecture Title */}
                        <span
                          className={`flex-1 text-left text-sm ${isCompleted
                            ? "text-richblack-400 line-through"
                            : "text-richblack-100"
                            }`}
                        >
                          {subSection.title}
                        </span>

                        {/* Computer Icon */}
                        <HiOutlineDesktopComputer className="text-richblack-400 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Video Player */}
        <div className="w-full bg-black">
          {currentSubSection?.videourl ? (
            <video
              ref={videoRef}
              key={currentSubSection._id}
              src={currentSubSection.videourl}
              controls
              autoPlay
              onEnded={handleVideoEnd}
              className="w-full max-h-[70vh] object-contain"
            />
          ) : (
            <div className="w-full h-[50vh] flex items-center justify-center bg-richblack-800">
              <p className="text-richblack-300">No video available</p>
            </div>
          )}
        </div>

        {/* Lecture Info */}
        <div className="p-6 flex-1">
          {/* Lecture Title */}
          <h1 className="text-2xl font-bold text-richblack-5 mb-4">
            {currentSubSection?.title || "Select a lecture"}
          </h1>

          {/* Lecture Description */}
          {currentSubSection?.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-richblack-5 mb-2">
                What you'll learn in this lecture:
              </h3>
              <p className="text-richblack-200 leading-relaxed">
                {currentSubSection.description}
              </p>
            </div>
          )}

          {/* Mark Complete Button (manual option) */}
          {currentSubSection && !completedLectures.includes(currentSubSection._id) && (
            <button
              onClick={() => markLectureComplete(currentSubSection._id)}
              className="px-4 py-2 bg-caribbeangreen-500 text-white rounded-lg hover:bg-caribbeangreen-600 transition-all text-sm"
            >
              Mark as Complete
            </button>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-richblack-800 rounded-xl border border-richblack-700 w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-richblack-700">
              <h2 className="text-xl font-semibold text-richblack-5">
                Add Review
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
                  alt={user?.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-richblack-5 font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-richblack-400 text-sm">Posting publicly</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-richblack-300">
                  Rate this course
                </label>
                <StarRating
                  rating={reviewData.rating}
                  setRating={(rating) =>
                    setReviewData((prev) => ({ ...prev, rating }))
                  }
                />
              </div>

              {/* Review Text */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-richblack-300">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your experience with this course..."
                  value={reviewData.reviews}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, reviews: e.target.value }))
                  }
                  className="p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-richblack-700 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewData({ rating: 0, reviews: "" });
                }}
                className="px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 hover:bg-richblack-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={submittingReview}
                className="px-4 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-semibold hover:bg-yellow-100 transition-all disabled:opacity-50"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseViewer;