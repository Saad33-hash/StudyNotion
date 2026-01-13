import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../Common/RatingStars";

const CourseCard = ({ course, Height }) => {
  // Calculate average rating from ratingAndReview array
  const getAverageRating = (ratingArr) => {
    if (!ratingArr || ratingArr.length === 0) return 0;
    const total = ratingArr.reduce((acc, curr) => {
      acc += curr?.rating || 0;  // ← Added null check with default 0
      return acc;
    }, 0);
    const average = total / ratingArr.length;
    // Check for NaN before calling toFixed
    return isNaN(average) ? 0 : parseFloat(average.toFixed(1));
  };

  const avgRating = getAverageRating(course?.ratingAndReview);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="rounded-lg bg-richblack-800 p-3 transition-all duration-200 hover:scale-[1.02]">
        {/* Thumbnail */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className={`${Height} w-full rounded-lg object-cover`}
          />
        </div>

        {/* Course Info */}
        <div className="flex flex-col gap-1 pt-3">
          {/* Course Name */}
          <p className="text-sm font-medium text-richblack-5 line-clamp-2">
            {course?.courseName}
          </p>

          {/* Instructor Name */}
          <p className="text-xs text-richblack-300">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-yellow-50">
              {avgRating || 0}
            </span>
            <RatingStars Review_Count={avgRating} />
            <span className="text-xs text-richblack-400">
              ({course?.ratingAndReview?.length || 0})
            </span>
          </div>

          {/* Price */}
          <p className="text-base font-semibold text-richblack-5">
            Rs. {course?.Price?.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;