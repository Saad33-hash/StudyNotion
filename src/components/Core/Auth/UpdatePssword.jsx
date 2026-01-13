import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GrLinkPrevious } from "react-icons/gr";
import { resetPassword } from "../../../Services/operation/authapi";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function changePassword() {
    setshowPassword(!showPassword);
  }

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      token
    }

    setLoading(true);
    try {
      const response = await resetPassword(finalData);
      if (response?.success) {
        toast.success("Password changed successfully!");
        navigate("/resetComplete");
      }
    } catch (error) {
      console.log("Error in reset catch block", error.message);
    } finally {
      setLoading(false);
    }
  };

  function toLogin() {
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4 py-10">
      <div className="w-full max-w-md bg-richblack-800 border border-richblack-700 rounded-2xl p-8 sm:p-10 flex flex-col items-start gap-6 shadow-[0_0_25px_rgba(0,0,0,0.4)]">

        <h2 className="text-richblack-25 text-2xl sm:text-3xl font-bold">
          Choose new password
        </h2>

        <p className="text-richblack-200 text-sm sm:text-base leading-relaxed font-normal max-w-full">
          Almost done. Enter your new password and you're all set.
        </p>

        <div className="w-full flex flex-col gap-1 relative">
          <label htmlFor="password" className="text-richblack-25 text-sm font-medium">
            New password<span className="text-red-500">*</span>
          </label>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="newpassword"
              placeholder="Enter your new password"
              disabled={loading}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character",
                },
              })}
              className={`w-full p-3 pr-10 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400
                         border border-richblack-600 focus:outline-none focus:ring-2 
                         focus:ring-yellow-50 transition-all duration-200
                         ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-25 cursor-pointer"
              onClick={changePassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 relative">
          <label htmlFor="confirmPassword" className="text-richblack-25 text-sm font-medium">
            Confirm new password<span className="text-red-500">*</span>
          </label>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmNewPassword"
              placeholder="Confirm your new password"
              disabled={loading}
              {...register("resetPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`w-full p-3 pr-10 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400
                         border border-richblack-600 focus:outline-none focus:ring-2 
                         focus:ring-yellow-50 transition-all duration-200
                         ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-25 cursor-pointer"
              onClick={changePassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {errors.resetPassword && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.resetPassword?.message}
            </p>
          )}
        </div>

        <div className="w-full text-center mt-3">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-richblack-900 bg-yellow-50 
                       hover:bg-yellow-100 transition-all duration-200 flex items-center justify-center gap-2
                       ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>

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
  );
};

export default UpdatePassword;