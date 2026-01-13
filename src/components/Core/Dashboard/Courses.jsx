import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../Services/apiConnector";
import RatingStars from "../../Common/RatingStars";

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await apiConnector(
          "GET",
          `${process.env.REACT_APP_BASE_URL}/Courseroutes/getAllData`
        );

        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  // Calculate average rating
  const getAverageRating = (ratingArr) => {
    if (!ratingArr || ratingArr.length === 0) return 4.5;
    const total = ratingArr.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return (total / ratingArr.length).toFixed(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full px-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-richblack-5">
        Courses
      </h1>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-richblack-800 rounded-xl border border-richblack-700">
          <p className="text-xl text-richblack-300">No courses available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-y-6 max-w-[950px]">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/courses/${course._id}`)}
              className="bg-richblack-800 rounded-lg overflow-hidden border border-richblack-700 hover:border-yellow-50 cursor-pointer transition-all duration-200 group"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Price Badge */}
                <div className="absolute top-2 right-2 bg-yellow-50 px-2 py-1 rounded text-richblack-900 font-semibold text-sm">
                  Rs. {course.Price?.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                {/* Course Name */}
                <h3 className="text-richblack-5 font-semibold text-base line-clamp-1 group-hover:text-yellow-50 transition-colors">
                  {course.courseName}
                </h3>

                {/* Instructor */}
                <p className="text-richblack-400 text-sm">
                  {course.instructor?.firstName || "Instructor"}{" "}
                  {course.instructor?.lastName || ""}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-50 font-semibold text-sm">
                    {getAverageRating(course.ratingAndReview)}
                  </span>
                  <RatingStars
                    Review_Count={getAverageRating(course.ratingAndReview)}
                    Star_Size={14}
                  />
                  <span className="text-richblack-400 text-xs">
                    ({course.ratingAndReview?.length || 0})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;