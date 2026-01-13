import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-[850px] mx-auto">
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
          onClick={() => navigate("/dashboard")}
          className="hover:text-richblack-50 cursor-pointer"
        >
          Dashboard
        </span>
        <span>/</span>
        <span className="text-yellow-50 font-medium">My Profile</span>
      </nav>

      {/* Page Header */}
      <h1 className="text-2xl font-bold text-richblack-5">My Profile</h1>

      {/* Section 1: Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 p-6 bg-richblack-800 rounded-xl border border-richblack-700">
        {/* Left - Profile Picture + Name/Email */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
            }
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        {/* Right - Edit Button */}
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-2 bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all"
        >
          <RiEditBoxLine />
          Edit
        </button>
      </div>

      {/* Section 2: Personal Details */}
      <div className="flex flex-col gap-6 p-6 bg-richblack-800 rounded-xl border border-richblack-700">
        {/* Header - Title + Edit Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-richblack-5">
            Personal Details
          </h2>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all"
          >
            <RiEditBoxLine />
            Edit
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-richblack-400">First Name</p>
            <p className="text-richblack-5">{user?.firstName || "—"}</p>
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-richblack-400">Last Name</p>
            <p className="text-richblack-5">{user?.lastName || "—"}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-richblack-400">Email</p>
            <p className="text-richblack-5">{user?.email || "—"}</p>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-richblack-400">Phone Number</p>
            <p className="text-richblack-5">
              {user?.contactNumber || user?.addittionalDetails?.contactNumber || "Add Phone Number"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;