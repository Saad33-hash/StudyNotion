import React, { useState } from 'react'

import Button from "../HomePage/Button"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import { resetPasswordLink } from '../../../Services/operation/authapi';

import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const email = localStorage.setItem("email", data.email);
    console.log("here is the email stored in local storage", localStorage.getItem("email"));

    setLoading(true);

    try {
      const response = await resetPasswordLink(data);
      console.log("Here is the response", response);
      if (response?.success) {
        toast.success("Link has been sent to your email successfully");
        navigate("/resendEmail")
      }
      return response;
    }
    catch (error) {
      console.log("Error in catch block of Forgot Password component", error.message)
    }
    finally {
      setLoading(false);
    }
  }

  function toLogin() {
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4 py-10">
      <div className="w-full max-w-md bg-richblack-800 border border-richblack-700 rounded-2xl p-8 sm:p-10 flex flex-col items-start gap-6 shadow-[0_0_25px_rgba(0,0,0,0.4)]">

        {/* Title */}
        <h2 className="text-richblack-25 text-2xl sm:text-3xl font-bold">
          Reset your password
        </h2>

        {/* Subtitle */}
        <p className="text-richblack-200 text-sm sm:text-base leading-relaxed font-normal max-w-full">
          Have no fear. We'll email you instructions to reset your password.
          If you don't have access to your email, we can help you with account recovery.
        </p>

        {/* Email Input */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email" className="text-richblack-25 text-sm font-medium">
            Email Address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            disabled={loading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className={`w-full p-3 sm:p-3.5 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400
                       border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-200
                       ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="w-full text-center mt-3">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-richblack-900 bg-yellow-50 
                       hover:bg-yellow-100 transition-all duration-200 flex items-center justify-center gap-2
                       ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>

        {/* Back to Login */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base text-richblack-25 mt-2">
          <div
            className={`flex items-center gap-2 cursor-pointer hover:text-yellow-50 transition-all duration-200
                       ${loading ? "pointer-events-none opacity-50" : ""}`}
            onClick={toLogin}
          >
            <GrLinkPrevious />
            <span>Back to Login</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword
