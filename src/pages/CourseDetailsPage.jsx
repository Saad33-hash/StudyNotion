import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCourseDetails } from "../Services/operation/courseDetailsAPI";
import CourseDetailsCard from "../components/Core/Course/CourseDetailsCard";
import CourseContent from "../components/Core/Course/CourseContent";
import RatingStars from "../components/Common/RatingStars";
import Fotter from "../components/Common/Fotter";
import ReviewSlider from "../components/Common/ReviewSlider";
import { BiTime } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const result = await getCourseDetails(courseId);
        if (result?.success) {
          setCourseData(result.data);
        }
      } catch (error) {
        console.log("Error fetching course details:", error);
      }
      setLoading(false);
    };

    fetchCourseDetails();
  }, [courseId]);

  const isEnrolled = user && courseData?.studentEnrolled?.some(
    (student) => student === user?._id || student?._id === user?._id
  );

  const isInstructor = user && courseData?.instructor?._id === user?._id;

  // Calculate average rating
  const getAverageRating = (ratingArr) => {
    if (!ratingArr || ratingArr.length === 0) return 0;
    const total = ratingArr.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return (total / ratingArr.length).toFixed(1);
  };

  const avgRating = getAverageRating(courseData?.ratingAndReview);



  // Loading state with yellow spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-richblack-200 text-sm">Loading course details...</p>
        </div>
      </div>
    );
  }

  // No data found
  if (!courseData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-richblack-900">
        <p className="text-2xl text-richblack-5">Course not found</p>
      </div>
    );
  }

  return (
    <div className="bg-richblack-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-richblack-800 max-h-[400px]">
        <div className="mx-auto max-w-maxContent px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Course Info */}
            <div className="lg:w-[65%] flex flex-col gap-4">
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
                  onClick={() => navigate(`/catalog/${courseData?.category?._id}`)}
                  className="hover:text-richblack-50 cursor-pointer"
                >
                  {courseData?.category?.names || "Catalog"}
                </span>
                <span>/</span>
                <span className="text-yellow-50 font-medium truncate max-w-[200px]">
                  {courseData?.courseName}
                </span>
              </nav>

              {/* Course Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-richblack-5">
                {courseData?.courseName}
              </h1>

              {/* Course Description */}
              <p className="text-richblack-200 text-base leading-relaxed">
                {courseData?.description}
              </p>

              {/* Rating & Students */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-50 font-semibold">{avgRating}</span>
                  <RatingStars Review_Count={avgRating} Star_Size={18} />
                  <span className="text-richblack-300">
                    ({courseData?.ratingAndReview?.length || 0} reviews)
                  </span>
                </div>
                <span className="text-richblack-300">
                  {courseData?.studentEnrolled?.length || 0} students enrolled
                </span>
              </div>

              {/* Instructor */}
              <p className="text-richblack-300 text-sm">
                Created by{" "}
                <span className="text-richblack-50 font-medium">
                  {courseData?.instructor?.firstName}{" "}
                  {courseData?.instructor?.lastName}
                </span>
              </p>

              {/* Created At & Language */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-richblack-300">
                <div className="flex items-center gap-2">
                  <BiTime className="text-lg" />
                  <span>
                    Created at{" "}
                    {new Date(courseData?.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineGlobeAlt className="text-lg" />
                  <span>{courseData?.language || "English"}</span>
                </div>
              </div>
            </div>

            {/* Right Side - Course Card (Desktop) */}
            <div className="hidden lg:block lg:w-[400px]">
              <div className="sticky top-8">
                <CourseDetailsCard
                  course={courseData}
                  isEnrolled={isEnrolled}
                  isInstructor={isInstructor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Course Card */}
      <div className="lg:hidden px-4 py-6">
        <CourseDetailsCard
          course={courseData}
          isEnrolled={isEnrolled}
          isInstructor={isInstructor}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-maxContent px-4 py-12">
        <div className="lg:w-[65%] flex flex-col gap-12">
          {/* What You'll Learn Section */}
          <div className="rounded-xl border border-richblack-600 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-richblack-5 mb-4">
              What you'll learn
            </h2>
            <div className="flex flex-col gap-3">
              {courseData?.whatYoulearn?.split(",").map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <BsCheckCircle className="text-caribbeangreen-300 text-lg mt-1 flex-shrink-0" />
                  <p className="text-richblack-100">{point.trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content Section */}
          <CourseContent courseContent={courseData?.courseContent} />

          {/* Author Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-richblack-5">Author</h2>
            <div className="flex items-center gap-4">
              <img
                src={
                  courseData?.instructor?.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`
                }
                alt={courseData?.instructor?.firstName}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-richblack-5">
                  {courseData?.instructor?.firstName}{" "}
                  {courseData?.instructor?.lastName}
                </p>
                <p className="text-sm text-richblack-300">
                  {courseData?.instructor?.addittionalDetails?.about ||
                    "Instructor at StudyNotion"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Slider */}
      <ReviewSlider />

      {/* Footer */}
      <Fotter />
    </div>
  );
};

export default CourseDetailsPage;