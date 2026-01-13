import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { GrLinkPrevious } from "react-icons/gr";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import CodingSkillText from '../HomePage/CodingSkillText';
import toast from "react-hot-toast";
import { signUp, sendotp } from '../../../Services/operation/authapi';

const VerifyEmailafterSign = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(() => {
    const stateData = location.state;
    const storedData = localStorage.getItem('signupData');
    return stateData || (storedData ? JSON.parse(storedData) : null);
  });

  useEffect(() => {
    if (!userData) {
      toast.error("Session expired. Please sign up again.");
      navigate("/signup", { replace: true });
    }
  }, [userData, navigate]);

  if (!userData) return null;

  const confirmSignIn = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const signUpData = { ...userData, otp };

    setLoading(true);
    try {
      const response = await signUp(signUpData);
      if (response?.data?.success) {
        toast.success("Account created successfully");
        localStorage.removeItem('signupData');
        navigate("/login");
      } else {
        toast.error(response?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    try {
      const response = await sendotp(userData);
      if (response?.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const toLogin = () => {
    localStorage.removeItem('signupData');
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4">
      <div className="w-full max-w-md bg-richblack-800 border border-richblack-700 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-lg">
        
        <h2 className="text-richblack-25 text-2xl sm:text-3xl font-bold text-center">
          Verify Email
        </h2>

        <p className="text-richblack-200 text-sm sm:text-base text-center font-medium leading-relaxed">
          A verification code has been sent to your email. Enter the code below to continue.
        </p>

        <div className={`flex justify-center items-center gap-2 sm:gap-3 flex-wrap ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="text-richblack-300 text-xl">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                disabled={loading}
                className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-richblack-700 text-richblack-5
                           border border-richblack-600 rounded-md text-center text-lg sm:text-xl font-medium
                           focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-200"
              />
            )}
          />
        </div>

        <div className="w-full">
          <button
            type="button"
            onClick={confirmSignIn}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-richblack-900 bg-yellow-50 
                       hover:bg-yellow-100 transition-all duration-200 flex items-center justify-center gap-2
                       ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              "Verify and Register"
            )}
          </button>
        </div>

        <div className="flex justify-between items-center w-full text-sm sm:text-base text-richblack-25">
          <div
            className={`flex items-center gap-2 cursor-pointer hover:text-yellow-50 transition-all duration-200
                       ${loading ? "pointer-events-none opacity-50" : ""}`}
            onClick={toLogin}
          >
            <GrLinkPrevious />
            <span>Back to Login</span>
          </div>

          <div 
            className={`flex items-center gap-2 cursor-pointer group
                       ${resendLoading || loading ? "pointer-events-none opacity-50" : ""}`}
            onClick={resendOtp}
          >
            {resendLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-cyan-400">Sending...</span>
              </>
            ) : (
              <>
                <FaClockRotateLeft className="text-cyan-400 transition-transform duration-300 group-hover:rotate-180" />
                <CodingSkillText text={"Resend It"} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailafterSign;