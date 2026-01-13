import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Tabs
  const tabs = ["All", "Pending", "Completed"];

  // Fetch enrolled courses from API
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/profile/getEnrolledCourses`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setEnrolledCourses(result.data || []);
        } else {
          console.log("Failed to fetch enrolled courses:", result.message);
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.log("Error fetching enrolled courses:", error);
        setEnrolledCourses([]);
      }
      setLoading(false);
    };

    fetchEnrolledCourses();
  }, [token, location.key]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter courses based on active tab
  const filteredCourses = enrolledCourses.filter((course) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return (course.progressPercentage || 0) < 100;
    if (activeTab === "Completed") return course.progressPercentage === 100;
    return true;
  });

  // Calculate total duration
  const getTotalDuration = (courseContent) => {
    if (!courseContent) return "0h 0m";
    let totalMinutes = 0;
    courseContent.forEach((section) => {
      section?.subSection?.forEach((subSec) => {
        totalMinutes += parseInt(subSec?.timeDuration || 0);
      });
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0 && minutes === 0) return "0h 0m";
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  // Mark course as complete
  const handleMarkComplete = (courseId) => {
    const updatedCourses = enrolledCourses.map((course) =>
      course._id === courseId ? { ...course, progressPercentage: 100 } : course
    );
    setEnrolledCourses(updatedCourses);
    setOpenMenuId(null);
    toast.success("Course marked as complete");
  };

  // Remove course - calls API to unenroll from database
  const handleRemoveCourse = async (courseId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Courseroutes/unenrollStudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId }),
        }
      );

      const result = await response.json();

      if (result.success) {
        const updatedCourses = enrolledCourses.filter(
          (course) => course._id !== courseId
        );
        setEnrolledCourses(updatedCourses);
        toast.success("Course removed successfully");
      } else {
        toast.error(result.message || "Failed to remove course");
      }
    } catch (error) {
      console.log("Error removing course:", error);
      toast.error("Something went wrong");
    }
    setOpenMenuId(null);
  };

  // Toggle menu
  const toggleMenu = (courseId) => {
    setOpenMenuId(openMenuId === courseId ? null : courseId);
  };

  // Progress Bar Component
  const ProgressBar = ({ progress }) => {
    return (
      <div className="flex items-center gap-2 w-full">
        <div className="w-[120px] h-2 bg-richblack-600 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${progress === 100 ? "bg-caribbeangreen-300" : "bg-yellow-50"
              }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-richblack-200">{progress}%</span>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-richblack-200 text-sm">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[1200px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-richblack-300">
        <span
          onClick={() => navigate("/")}
          className="hover:text-richblack-50 cursor-pointer"
        >
          Home
        </span>
        <span>/</span>
        <span
          onClick={() => navigate("/dashboard/my-profile")}
          className="hover:text-richblack-50 cursor-pointer"
        >
          Dashboard
        </span>
        <span>/</span>
        <span className="text-yellow-50 font-medium">Enrolled Courses</span>
      </nav>

      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5">
        Enrolled Courses
      </h1>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-richblack-800 rounded-full w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
              ? "bg-richblack-900 text-richblack-5"
              : "text-richblack-300 hover:text-richblack-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] bg-richblack-800 rounded-xl border border-richblack-700 p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png"
            alt="No courses"
            className="w-24 h-24 opacity-50"
          />
          <p className="text-richblack-300 text-lg text-center">
            You have not enrolled in any course yet.
          </p>
          <button
            onClick={() => navigate("/dashboard/courses")}
            className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-all mt-2"
          >
            Browse Courses
          </button>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[300px] bg-richblack-800 rounded-xl border border-richblack-700 p-8">
          <p className="text-richblack-300 text-lg text-center">
            No {activeTab.toLowerCase()} courses found.
          </p>
        </div>
      ) : (
        <>
          {/* Table Header - Desktop */}
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-richblack-700 rounded-t-xl text-richblack-200 text-sm font-medium">
            <div className="col-span-6">Course Name</div>
            <div className="col-span-2 text-center">Duration</div>
            <div className="col-span-3 text-center">Progress</div>
            <div className="col-span-1"></div>
          </div>

          {/* Course Rows */}
          <div className="flex flex-col gap-4 sm:gap-0">
            {filteredCourses.map((course, index) => (
              <div
                key={course._id || index}
                className={`
                  flex flex-col sm:grid sm:grid-cols-12 gap-4 p-4 
                  bg-richblack-800 border border-richblack-700
                  ${index === 0 ? "sm:rounded-t-none sm:border-t-0" : ""}
                  ${index === filteredCourses.length - 1 ? "rounded-b-xl" : ""}
                  rounded-xl sm:rounded-none
                  hover:bg-richblack-750 transition-all
                `}
              >
                {/* Course Info - 6 columns */}
                <div
                  className="sm:col-span-6 flex gap-4 cursor-pointer"
                  onClick={() => navigate(`/view-course/${course._id}`)}
                >
                  {/* Thumbnail */}
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="w-[100px] h-[60px] sm:w-[80px] sm:h-[50px] object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Course Name */}
                  <div className="flex flex-col justify-center min-w-0">
                    <h3 className="text-richblack-5 font-semibold line-clamp-2 text-sm sm:text-base hover:text-yellow-50 transition-all">
                      {course?.courseName}
                    </h3>
                  </div>
                </div>

                {/* Duration - 2 columns */}
                <div className="sm:col-span-2 flex sm:items-center sm:justify-center">
                  <span className="text-richblack-300 text-sm sm:hidden mr-2">
                    Duration:
                  </span>
                  <span className="text-richblack-100 text-sm">
                    {getTotalDuration(course?.courseContent)}
                  </span>
                </div>

                {/* Progress - 3 columns */}
                <div className="sm:col-span-3 flex sm:items-center sm:justify-center">
                  <span className="text-richblack-300 text-sm sm:hidden mr-2">
                    Progress:
                  </span>
                  <ProgressBar progress={course?.progressPercentage || 0} />
                </div>

                {/* 3-Dot Menu - 1 column */}
                <div
                  className="sm:col-span-1 flex sm:items-center sm:justify-center relative"
                  ref={openMenuId === course._id ? menuRef : null}
                >
                  <button
                    onClick={() => toggleMenu(course._id)}
                    className="p-2 rounded-lg hover:bg-richblack-700 transition-all"
                  >
                    <BsThreeDotsVertical className="text-richblack-300 text-lg" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === course._id && (
                    <div className="absolute right-0 top-10 z-50 w-48 bg-richblack-700 rounded-lg shadow-lg border border-richblack-600 overflow-hidden">
                      <button
                        onClick={() => handleMarkComplete(course._id)}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-richblack-100 hover:bg-richblack-600 transition-all"
                      >
                        <IoCheckmarkCircle className="text-caribbeangreen-300 text-lg" />
                        Mark as Complete
                      </button>
                      <button
                        onClick={() => handleRemoveCourse(course._id)}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-pink-300 hover:bg-richblack-600 transition-all"
                      >
                        <RiDeleteBin6Line className="text-lg" />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EnrolledCourses;