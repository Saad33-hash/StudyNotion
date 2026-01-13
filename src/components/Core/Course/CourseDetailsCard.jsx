import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../Slices/cartSlice";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

const CourseDetailsCard = ({ course, isEnrolled, isInstructor }) => {
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if course is already in wishlist
  const isInWishlist = cart?.some((item) => item._id === course._id);

  // Handle Add to Cart / Wishlist
  const handleAddToCart = () => {
    // Check if logged in
    if (!token) {
      // Save course to localStorage for after login
      localStorage.setItem("pendingWishlistCourse", JSON.stringify(course));
      toast.error("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    // Check if already in wishlist
    if (isInWishlist) {
      toast.error("Course already in wishlist");
      navigate("/dashboard/wishlist");
      return;
    }

    // Add to wishlist and navigate
    dispatch(addToCart(course));
    navigate("/dashboard/wishlist");
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    // Check if logged in
    if (!token) {
      // Save course to localStorage for after login
      localStorage.setItem("pendingWishlistCourse", JSON.stringify(course));
      toast.error("Please login to purchase");
      navigate("/login");
      return;
    }

    // Check if already in wishlist - just navigate
    if (isInWishlist) {
      navigate("/dashboard/wishlist");
      return;
    }

    // Add to wishlist and navigate
    dispatch(addToCart(course));
    navigate("/dashboard/wishlist");
  };

  // Handle Go to Course (for enrolled users)
  const handleGoToCourse = () => {
    navigate(`/view-course/${course._id}`);
  };

  return (
    <div className="flex flex-col rounded-xl bg-richblack-700 overflow-hidden">
      {/* Course Thumbnail */}
      <img
        src={course?.thumbnail}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-full object-cover"
      />

      {/* Card Content */}
      <div className="flex flex-col gap-4 p-6">
        {/* Price */}
        <p className="text-3xl font-bold text-richblack-5">
          Rs. {course?.Price?.toLocaleString("en-IN")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {isEnrolled ? (
            <button
              onClick={handleGoToCourse}
              className="w-full rounded-lg bg-yellow-50 py-3 px-5 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
            >
              Go to Course
            </button>
          ) : isInstructor ? (
            <button
              onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
              className="w-full rounded-lg bg-yellow-50 py-3 px-5 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
            >
              Edit Course
            </button>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                className="w-full rounded-lg bg-yellow-50 py-3 px-5 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full rounded-lg bg-richblack-800 py-3 px-5 font-semibold text-richblack-5 hover:bg-richblack-900 transition-all duration-200"
              >
                Buy Now
              </button>
            </>
          )}
        </div>

        {/* Money Back Guarantee */}
        <p className="text-center text-sm text-richblack-300">
          30-Day Money-Back Guarantee
        </p>

        {/* This Course Includes */}
        <div>
          <p className="text-base font-semibold text-richblack-5 mb-3">
            This course includes:
          </p>
          <ul className="flex flex-col gap-2 text-sm text-caribbeangreen-100">
            <li className="flex items-center gap-2">
              <BsFillCaretRightFill className="text-caribbeangreen-300" />
              8 hours on-demand video
            </li>
            <li className="flex items-center gap-2">
              <BsFillCaretRightFill className="text-caribbeangreen-300" />
              Full Lifetime access
            </li>
            <li className="flex items-center gap-2">
              <BsFillCaretRightFill className="text-caribbeangreen-300" />
              Access on Mobile and TV
            </li>
            <li className="flex items-center gap-2">
              <BsFillCaretRightFill className="text-caribbeangreen-300" />
              Certificate of completion
            </li>
          </ul>
        </div>

        {/* Share Button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
          }}
          className="mx-auto flex items-center gap-2 text-yellow-50 text-sm hover:underline"
        >
          <FaShareSquare />
          Share
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;