import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import CodingSKillText from '../HomePage/CodingSkillText'
import Frame from "../../../assets/Images/frame.png"
import SignUpImage from "../../../assets/Images/signup.webp"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendotp } from '../../../Services/operation/authapi'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import countries from "../../../data/countrycode.json";

const FormSigningIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const tabsName = [
    "Student",
    "Instructor"
  ]

  const [currentTab, setCurrentTab] = useState(tabsName[0])

  function chnageTab(tab) {
    if (!loading) {
      setCurrentTab(tab)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("raw data", data);
      const finalData = {
        ...data,
        accountType: currentTab,
      };

      console.log("Form data before sending OTP:", finalData);

      const response = await sendotp(finalData);

      if (response?.success) {
        console.log("I am inside success reponse data")
        toast.success("OTP sent successfully!");
        localStorage.setItem('signupData', JSON.stringify(finalData));
        navigate("/verifyemail", { state: finalData });
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    }
    catch (error) {
      console.log("error in catch block of onSubmit", error);
    }
    finally {
      setLoading(false);
    }
  };

  const [showPassword, setshowPassword] = useState(false);

  function changePassword() {
    setshowPassword(!showPassword)
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center 
                    gap-8 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 mx-auto max-w-[1200px] mt-20">

      {/* LEFT SIDE — Heading + Tabs + Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6 ">

        {/* Heading */}
        <div className="text-center lg:text-left ml-5">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug 
                         max-w-full lg:max-w-[85%]">
            Join the millions learning to code with StudyNotion for free
          </h1>
        </div>

        {/* Subheading */}
        <div className="w-full sm:w-[90%] lg:max-w-[72%] text-center lg:text-left ml-5">
          <p className="text-richblack-200 text-sm sm:text-base leading-relaxed ">
            Build skills for today, tomorrow, and beyond.
            <span className="font-edu-sa text-xs sm:text-sm block sm:inline">
              <CodingSKillText text="Education to future-proof your career" />
            </span>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center lg:justify-start w-full ml-5">
          <div className={`flex bg-richblack-600 gap-5 rounded-2xl p-1 cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}>
            {tabsName.map((element, index) => {
              return (
                <div
                  className={`flex items-center justify-center px-2 py-1 rounded-xl transition-all duration-200 ${currentTab === element ? "bg-richblack-900 text-richblack-5"
                    : "text-richblack-200 bg-richblack-600"
                    }`}
                  key={index}
                  onClick={() => chnageTab(element)}
                >
                  {element}
                </div>
              )
            })}
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full flex justify-center lg:justify-start px-2 sm:px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-[420px] sm:max-w-[380px] lg:max-w-[360px]"
          >

            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="w-full sm:w-1/2">
                <p className="text-richblack-25">
                  First Name<span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  placeholder="First Name"
                  disabled={loading}
                  {...register("firstName", { required: "First Name is required" })}
                  className={`p-2 rounded-lg bg-richblack-600 w-full text-richblack-5 
                             focus:outline-none focus:ring-2 focus:ring-yellow-50
                             ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <p className="text-richblack-25">
                  Last Name<span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Last Name"
                  disabled={loading}
                  {...register("lastName", { required: "Last Name is required" })}
                  className={`p-2 rounded-lg bg-richblack-600 w-full text-richblack-5 
                             focus:outline-none focus:ring-2 focus:ring-yellow-50
                             ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 w-full">
              <p className="text-richblack-25">
                Email Address<span className="text-red-600">*</span>
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                disabled={loading}
                {...register("email", {
                  required: true,
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                })}
                className={`p-2 rounded-lg bg-richblack-600 w-full text-richblack-5 
                           focus:outline-none focus:ring-2 focus:ring-yellow-50
                           ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <p className="text-richblack-25">
                Phone Number<span className="text-red-600">*</span>
              </p>

              <div className="flex gap-4">
                <select
                  disabled={loading}
                  className={`p-2 rounded-lg bg-richblack-600 w-[25%] 
                             text-richblack-5 focus:outline-none focus:ring-2 
                             focus:ring-yellow-50 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {countries.map((element, index) => {
                    return (
                      <option key={index} className="overflow-hidden">
                        {element.code} {"-"} {element.country}
                      </option>
                    )
                  })}
                </select>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  disabled={loading}
                  {...register("contactNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className={`p-2 rounded-lg bg-richblack-600 w-full 
                             text-richblack-5 focus:outline-none focus:ring-2 
                             focus:ring-yellow-50 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">{errors.contactNumber?.message}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative flex flex-col w-full sm:w-1/2">
                <label className="text-richblack-25 mb-1">
                  Create Password <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  disabled={loading}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" },
                  })}
                  className={`p-2 rounded-lg bg-richblack-600 text-richblack-5 
                             focus:outline-none focus:ring-2 focus:ring-yellow-50
                             ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                <span
                  className="absolute right-3 top-9 text-richblack-25 cursor-pointer"
                  onClick={changePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <div className="relative flex flex-col w-full sm:w-1/2">
                <label className="text-richblack-25 mb-1">
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  disabled={loading}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match",
                  })}
                  className={`p-2 rounded-lg bg-richblack-600 text-richblack-5 
                             focus:outline-none focus:ring-2 focus:ring-yellow-50
                             ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                <span
                  className="absolute right-3 top-9 text-richblack-25 cursor-pointer"
                  onClick={changePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end text-xs mt-1">
              <Link to="/forgotPassword" className={loading ? "pointer-events-none opacity-50" : ""}>
                <CodingSKillText text="Forgot Password?" />
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`p-2 rounded-lg bg-yellow-50 text-center mt-5 
                         text-richblack-900 font-medium hover:bg-yellow-100 
                         transition-all w-full flex items-center justify-center gap-2
                         ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE — Image */}
      <div className="relative w-full lg:w-1/2 max-w-[450px] mx-auto hidden md:flex justify-center items-center">
        <img
          src={SignUpImage}
          alt="signup"
          className="relative z-10 w-full h-auto object-cover"
        />
        <img
          src={Frame}
          alt="frame"
          className="absolute -bottom-4 -right-4 z-0 w-[80%] sm:w-[400px] object-cover"
        />
      </div>
    </div>
  )
}

export default FormSigningIn