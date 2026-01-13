import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../../Slices/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import RatingStars from "../../Common/RatingStars";

const Wishlist = () => {
  const { cart, total, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle remove from wishlist
  const handleRemove = (courseId) => {
    dispatch(removeFromCart(courseId));
  };

  // Handle Buy Now - go to checkout
  const handleBuyNow = () => {
    navigate("/dashboard/checkout");
  };

  // Calculate average rating for a course
  const getAverageRating = (ratingArr) => {
    if (!ratingArr || ratingArr.length === 0) return 4.5;
    const total = ratingArr.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return (total / ratingArr.length).toFixed(1);
  };

  // Get total lectures count
  const getTotalLectures = (courseContent) => {
    if (!courseContent) return 0;
    return courseContent.reduce(
      (acc, section) => acc + (section?.subSection?.length || 0),
      0
    );
  };

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
        <span className="text-yellow-50 font-medium">Wishlist</span>
      </nav>

      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5">
        My Wishlist
      </h1>

      {/* Course Count */}
      <p className="text-richblack-400 text-sm border-b border-richblack-700 pb-4">
        {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Wishlist
      </p>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-richblack-800 rounded-xl border border-richblack-700">
          <p className="text-xl text-richblack-300">Your wishlist is empty</p>
          <p className="text-sm text-richblack-400">
            Add courses to your wishlist to see them here
          </p>
          <button
            onClick={() => navigate("/dashboard/courses")}
            className="px-6 py-3 mt-4 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Side - Course List */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((course) => (
              <div
                key={course._id}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-richblack-800 rounded-xl border border-richblack-700"
              >
                {/* Course Thumbnail */}
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="w-full sm:w-[180px] h-[120px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-all"
                />

                {/* Course Details */}
                <div className="flex flex-col flex-1 gap-1">
                  {/* Course Name */}
                  <h3
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="text-lg font-semibold text-richblack-5 line-clamp-2 cursor-pointer hover:text-yellow-50 transition-all"
                  >
                    {course?.courseName}
                  </h3>

                  {/* Instructor Name */}
                  <p className="text-sm text-richblack-300">
                    {course?.instructor?.firstName || "Instructor"}{" "}
                    {course?.instructor?.lastName || ""}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-50 font-semibold text-sm">
                      {getAverageRating(course?.ratingAndReview)}
                    </span>
                    <RatingStars
                      Review_Count={getAverageRating(course?.ratingAndReview)}
                      Star_Size={16}
                    />
                    <span className="text-richblack-400 text-sm">
                      ({course?.ratingAndReview?.length || 0} Reviews)
                    </span>
                  </div>

                  {/* Course Meta */}
                  <p className="text-xs text-richblack-400 mt-1">
                    {course?.courseContent?.length || 0} Sections •{" "}
                    {getTotalLectures(course?.courseContent)} Lectures •{" "}
                    {course?.level || "Beginner"}
                  </p>
                </div>

                {/* Right Section - Remove & Price */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(course._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-richblack-700 text-pink-200 rounded-lg hover:bg-pink-900/50 hover:text-pink-100 transition-all text-sm"
                  >
                    <RiDeleteBin6Line className="text-lg" />
                    <span>Remove</span>
                  </button>

                  {/* Price */}
                  <p className="text-xl font-bold text-yellow-50">
                    Rs. {course?.Price?.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Total & Buy Now (Sticky) */}
          <div className="lg:w-[280px]">
            <div className="sticky top-8 p-5 bg-richblack-800 rounded-xl border border-richblack-700">
              {/* Total Label */}
              <p className="text-sm text-richblack-300 mb-1">Total</p>

              {/* Total Price */}
              <p className="text-2xl sm:text-3xl font-bold text-yellow-50 mb-1">
                Rs. {total?.toLocaleString("en-IN")}
              </p>

              {/* Discount text - optional */}
              <p className="text-xs text-richblack-400 mb-4">
                {totalItems} {totalItems === 1 ? "course" : "courses"} in wishlist
              </p>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;