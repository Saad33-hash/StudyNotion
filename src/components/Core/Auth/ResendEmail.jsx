import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import toast from 'react-hot-toast';
import { resetPasswordLink } from '../../../Services/operation/authapi';

const ResendEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await resetPasswordLink({ email });
      if (response?.success) {
        toast.success("Link has been sent again to your email!");
      }
    } catch (error) {
      console.log("Error in catch block of Resend email component", error.message)
    } finally {
      setLoading(false);
    }
  }

  function toLogin() {
    navigate("/logIn")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4 py-10">
      <div className="w-full max-w-md bg-richblack-800 border border-richblack-700 rounded-2xl p-8 sm:p-10 flex flex-col items-start gap-6 shadow-[0_0_25px_rgba(0,0,0,0.4)]">

        <h2 className="text-richblack-25 text-2xl sm:text-3xl font-bold">
          Check email
        </h2>

        <p className="text-richblack-200 text-sm sm:text-base leading-relaxed font-normal max-w-full">
          We have sent the reset email to {email || "your email"}
        </p>

        <div className="w-full text-center mt-3">
          <button
            type="button"
            onClick={onSubmit}
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
              "Resend Email"
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
  )
}

export default ResendEmail