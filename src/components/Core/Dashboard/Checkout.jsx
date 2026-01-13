import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetCart } from "../../../Slices/cartSlice";
import RatingStars from "../../Common/RatingStars";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";

const Checkout = () => {
  const { cart, total, totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      email: user?.email || "",
    },
  });

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

  // Handle payment
  const onSubmit = async (data) => {
    setLoading(true);

    // Capture cart before processing
    const coursesToEnroll = [...cart];
    const courseIds = coursesToEnroll.map((course) => course._id);
    const totalAmount = total;

    console.log("Payment started, courses to enroll:", coursesToEnroll);

    try {
      // Step 1: Call enrollment API to save in database
      const enrollResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Courseroutes/enrollStudents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courses: courseIds }),
        }
      );

      const enrollResult = await enrollResponse.json();
      console.log("Enrollment API response:", enrollResult);

      if (!enrollResult.success) {
        toast.error(enrollResult.message || "Enrollment failed");
        setLoading(false);
        return;
      }

      // Step 2: Create payment record in database
      const paymentResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Courseroutes/createPayment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courses: courseIds,
            amount: totalAmount,
          }),
        }
      );

      const paymentResult = await paymentResponse.json();
      console.log("Payment API response:", paymentResult);

      if (!paymentResult.success) {
        console.log("Payment record failed, but enrollment succeeded");
      }

      // Enrollment is now saved in database via enrollStudents API
      console.log("Enrollment saved to database successfully");

      setLoading(false);
      setShowSuccessModal(true);

      // Clear cart after successful payment
      dispatch(resetCart());

      toast.success("Payment successful! You are now enrolled.");
    } catch (error) {
      console.log("Enrollment error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Handle go to enrolled courses
  const handleGoToEnrolledCourses = () => {
    setShowSuccessModal(false);
    navigate("/dashboard/enrolled-courses");
  };

  // If cart is empty, redirect to wishlist
  if (cart.length === 0 && !showSuccessModal) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-xl text-richblack-300">Your cart is empty</p>
        <button
          onClick={() => navigate("/dashboard/wishlist")}
          className="px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all"
        >
          Go to Wishlist
        </button>
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
          onClick={() => navigate("/dashboard/wishlist")}
          className="hover:text-richblack-50 cursor-pointer"
        >
          Wishlist
        </span>
        <span>/</span>
        <span className="text-yellow-50 font-medium">Checkout</span>
      </nav>

      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5">
        Checkout
      </h1>

      {/* Order Summary Label */}
      <p className="text-richblack-300 text-sm">Order Summary</p>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Side - Order Summary (Course List) */}
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
                className="w-full sm:w-[150px] h-[100px] object-cover rounded-lg"
              />

              {/* Course Details */}
              <div className="flex flex-col flex-1 gap-1">
                {/* Course Name */}
                <h3 className="text-base font-semibold text-richblack-5 line-clamp-2">
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
                    Star_Size={14}
                  />
                  <span className="text-richblack-400 text-xs">
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

              {/* Price */}
              <div className="flex items-start">
                <p className="text-lg font-bold text-yellow-50">
                  Rs. {course?.Price?.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Payment Details */}
        <div className="lg:w-[350px]">
          <div className="sticky top-8 p-5 bg-richblack-800 rounded-xl border border-richblack-700">
            {/* Payment Details Header */}
            <h2 className="text-lg font-semibold text-richblack-5 mb-2">
              Payment Details
            </h2>
            <p className="text-xs text-richblack-400 mb-6">
              Complete your purchase items and providing your payment details to us.
            </p>

            {/* Payment Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-richblack-300">
                  Full Name <span className="text-pink-300">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className="p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                />
                {errors.fullName && (
                  <p className="text-pink-300 text-xs">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email ID */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-richblack-300">
                  Email ID <span className="text-pink-300">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                />
                {errors.email && (
                  <p className="text-pink-300 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-richblack-700 my-2"></div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-richblack-300">Total</span>
                <span className="text-xl font-bold text-yellow-50">
                  Rs. {total?.toLocaleString("en-IN")}/-
                </span>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : `Pay Rs. ${total?.toLocaleString("en-IN")}`}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-richblack-800 rounded-xl border border-richblack-700 p-8 w-full max-w-md shadow-xl text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-caribbeangreen-400 flex items-center justify-center">
                <BsCheckCircleFill className="text-4xl text-richblack-900" />
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-richblack-5 mb-2">
              Payment Successful!
            </h2>
            <p className="text-richblack-300 mb-6">
              You have successfully enrolled in {totalItems}{" "}
              {totalItems === 1 ? "course" : "courses"}. Start learning now!
            </p>

            {/* Go to Enrolled Courses Button */}
            <button
              onClick={handleGoToEnrolledCourses}
              className="w-full py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all"
            >
              Go to Enrolled Courses
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;