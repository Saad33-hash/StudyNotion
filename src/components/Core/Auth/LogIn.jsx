import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Tab from './Tab'
import Frame from "../../../assets/Images/frame.png"
import loginImage from "../../../assets/Images/login.webp"
import { Link } from "react-router-dom"
import CodingSkillText from '../HomePage/CodingSkillText'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { login } from "../../../Services/operation/authapi"
import { useDispatch } from 'react-redux'
import { setToken } from "../../../Slices/authSlice"
import { setUser } from "../../../Slices/ProfileSlice"
import { addToCart } from "../../../Slices/cartSlice"

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await login(data);
      console.log("Here is the response", response);

      if (response?.data?.success) {
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("User Logged In successfully");

        const pendingWishlistCourse = localStorage.getItem("pendingWishlistCourse");

        if (pendingWishlistCourse) {
          const course = JSON.parse(pendingWishlistCourse);
          dispatch(addToCart(course));
          localStorage.removeItem("pendingWishlistCourse");
          navigate("/dashboard/wishlist");
        } else {
          navigate("/dashboard/my-profile");
        }
      } else {
        toast.error(response?.data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Error in login:", error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setshowPassword] = useState(false);

  function changePassword() {
    setshowPassword(!showPassword)
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center lg:gap-10 gap-6 p-6 mx-auto max-w-[1200px]">

      {/* LEFT SIDE — Heading + Tabs + Form */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6'>

        {/* Heading */}
        <div className='text-center lg:text-left'>
          <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl font-semibold'>
            Welcome Back
          </h1>
        </div>

        {/* Subheading */}
        <div className='w-full sm:w-[80%] lg:max-w-[65%] text-center lg:text-left'>
          <p className='text-richblack-200 text-sm sm:text-base leading-relaxed '>
            Build skills for today, tomorrow, and beyond.
            <span className='font-edu-sa text-xs sm:text-sm block sm:inline'>
              <CodingSkillText text={"Education to future-proof your career"} />
            </span>
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex justify-center lg:justify-start w-full ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          <Tab />
        </div>

        {/* Login Form */}
        <div className="w-full flex justify-center lg:justify-start px-6 sm:px-6 -ml-6">
          <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-[420px] sm:max-w-[380px] lg:max-w-[360px]"
          >
            {/* Email Field */}
            <div className="flex flex-col gap-1 w-full">
              <p className="text-richblack-25">
                Email Address<span className="text-red-600">*</span>
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                disabled={loading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`p-2 rounded-lg bg-richblack-600 w-full 
                           text-richblack-5 focus:outline-none focus:ring-2 
                           focus:ring-yellow-50 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative flex flex-col gap-1 w-full">
              <p className="text-richblack-25">
                Password<span className="text-red-600">*</span>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                disabled={loading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot exceed 20 characters",
                  },
                })}
                className={`p-2 rounded-lg bg-richblack-600 w-full 
                           text-richblack-5 focus:outline-none focus:ring-2 
                           focus:ring-yellow-50 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <span
                className="absolute right-3 top-10 text-richblack-25 cursor-pointer"
                onClick={changePassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end text-xs mt-1">
              <Link to="/forgotPassword" className={loading ? "pointer-events-none opacity-50" : ""}>
                <CodingSkillText text="Forgot Password?" linkto="/forgotPassword" />
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`p-2 rounded-lg bg-yellow-50 text-center mt-5 
                         text-richblack-900 font-medium hover:bg-yellow-100 
                         transition-all flex items-center justify-center gap-2
                         ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className='relative max-w-[450px] mx-auto hidden lg:flex justify-center items-center'>
        <img
          src={loginImage}
          alt="login"
          className='relative z-10 w-full h-auto object-cover'
        />
        <img
          src={Frame}
          alt="frameimage"
          className='absolute -bottom-4 -right-4 z-0 lg:w-[450px] lg:h-[400px] object-cover'
        />
      </div>
    </div>
  )
}

export default LogIn