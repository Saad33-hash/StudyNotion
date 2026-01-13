import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setUser } from "../../../Slices/ProfileSlice";
import { setlogout } from "../../../Slices/authSlice";
import { setLogoutUser } from "../../../Slices/ProfileSlice";
import {
  updateProfile,
  updateProfilePicture,
  deleteProfile,
  changePassword,
} from "../../../Services/operation/profileAPI";
import { IoChevronBack } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.image || null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Country codes
  const countryCodes = [
    { code: "+92", country: "PK" },
    { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+966", country: "SA" },
    { code: "+61", country: "AU" },
    { code: "+86", country: "CN" },
  ];

  // Profession options
  const professionOptions = [
    "Developer",
    "Designer",
    "Student",
    "Teacher",
    "Other",
  ];

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      displayName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      profession: user?.profession || "",
      dateOfBirth: user?.addittionalDetails?.dateOfBirth || "",
      gender: user?.addittionalDetails?.gender || "",
      countryCode: "+92",
      contactNumber:
        user?.addittionalDetails?.contactNumber || user?.contactNumber || "",
      about: user?.addittionalDetails?.about || "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm();

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(user?.image || null);
  };

  // Handle profile picture upload
  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("imageUpload", imageFile);

    setLoading(true);
    const result = await updateProfilePicture(token, formData);

    if (result) {
      // Update user in Redux with new image
      dispatch(setUser({ ...user, image: result.Image }));
      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, image: result.Image })
      );
      setImageFile(null);
    }
    setLoading(false);
  };

  // Handle profile form submit
  const onProfileSubmit = async (data) => {
    setLoading(true);

    // If image file is selected, upload it first
    if (imageFile) {
      await handleImageUpload();
    }

    // Prepare profile data for API
    const profileData = {
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      contactNumber: data.countryCode + data.contactNumber,
      about: data.about,
    };

    const result = await updateProfile(token, profileData);

    if (result) {
      // Update user in Redux with new profile data
      const updatedUser = {
        ...user,
        addittionalDetails: {
          ...user.addittionalDetails,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          contactNumber: data.countryCode + data.contactNumber,
          about: data.about,
        },
      };
      dispatch(setUser(updatedUser));
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setLoading(false);
  };

  // Handle password change
  const onPasswordSubmit = async (data) => {
    if (!data.currentPassword || !data.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    setLoading(true);

    // Prepare password data for API
    // Use newPassword for both password and confirmPassword since UI only has 2 fields
    const passwordData = {
      oldpassword: data.currentPassword,
      password: data.newPassword,
      confirmPassword: data.newPassword,
    };

    const result = await changePassword(token, passwordData);

    if (result) {
      resetPasswordForm();
    }
    setLoading(false);
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    setLoading(true);
    const result = await deleteProfile(token, user._id);

    if (result) {
      dispatch(setlogout());
      dispatch(setLogoutUser());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
    setLoading(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[850px] mx-auto pb-10 px-1">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/my-profile")}
        className="flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-all w-fit"
      >
        <IoChevronBack />
        <span>Back</span>
      </button>

      {/* Page Header */}
      <h1 className="text-2xl font-bold text-richblack-5">Edit Profile</h1>

      {/* Section 1: Change Profile Picture */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-richblack-800 rounded-xl border border-richblack-700">
        <img
          src={
            imagePreview ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
          }
          alt="profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="text-richblack-5 font-medium">Change Profile Picture</p>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all cursor-pointer">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <button
              onClick={handleRemoveImage}
              className="flex items-center gap-2 bg-richblack-700 text-richblack-5 px-4 py-2 rounded-lg font-medium hover:bg-richblack-600 transition-all"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Profile Information */}
      <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
        <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 bg-richblack-800 rounded-xl border border-richblack-700">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">Display Name</label>
              <input
                type="text"
                {...registerProfile("displayName")}
                placeholder="Enter your name"
                className="p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
              />
              <p className="text-xs text-richblack-400">
                Name entered above will be used for all issued certificates
              </p>
            </div>

            {/* Profession */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">Profession</label>
              <select
                {...registerProfile("profession")}
                className="p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
              >
                <option value="">Select Profession</option>
                {professionOptions.map((profession, index) => (
                  <option key={index} value={profession}>
                    {profession}
                  </option>
                ))}
              </select>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">Date of Birth</label>
              <input
                type="date"
                {...registerProfile("dateOfBirth")}
                className="p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">Gender</label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-3 rounded-lg bg-richblack-700 border border-richblack-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Male"
                    {...registerProfile("gender")}
                    className="w-4 h-4 accent-yellow-50"
                  />
                  <span className="text-richblack-5 text-sm">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Female"
                    {...registerProfile("gender")}
                    className="w-4 h-4 accent-yellow-50"
                  />
                  <span className="text-richblack-5 text-sm">Female</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Other"
                    {...registerProfile("gender")}
                    className="w-4 h-4 accent-yellow-50"
                  />
                  <span className="text-richblack-5 text-sm">Other</span>
                </label>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">Phone Number</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  {...registerProfile("countryCode")}
                  className="w-full sm:w-28 p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                >
                  {countryCodes.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.code} {item.country}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  {...registerProfile("contactNumber")}
                  placeholder="12345 67890"
                  className="flex-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                />
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">About</label>
              <textarea
                {...registerProfile("about")}
                rows={3}
                placeholder="Enter Bio Details"
                className="p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 resize-none"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Section 3: Password */}
      <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
        <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 bg-richblack-800 rounded-xl border border-richblack-700">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                  placeholder="••••••••"
                  className="w-full p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300"
                >
                  {showCurrentPassword ? (
                    <AiOutlineEyeInvisible className="text-xl" />
                  ) : (
                    <AiOutlineEye className="text-xl" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-pink-300 text-sm">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-richblack-300">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full p-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible className="text-xl" />
                  ) : (
                    <AiOutlineEye className="text-xl" />
                  )}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-pink-300 text-sm">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Change Password Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-medium hover:bg-yellow-100 transition-all disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </form>

      {/* Section 4: Delete Account */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-pink-900/30 rounded-xl border border-pink-800">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-800 flex items-center justify-center flex-shrink-0">
            <span className="text-pink-200 text-lg sm:text-xl">!</span>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-pink-100">
              Delete Account
            </h2>
            <p className="text-sm text-pink-200">
              Would you like to delete account?
            </p>
            <p className="text-sm text-richblack-300">
              This account contains Paid Courses. Deleting your account will
              remove all the content associated with it.
            </p>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              disabled={loading}
              className="text-pink-300 hover:text-pink-200 italic text-sm w-fit mt-1"
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-richblack-700 text-richblack-5 font-medium hover:bg-richblack-600 transition-all"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleProfileSubmit(onProfileSubmit)}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-medium hover:bg-yellow-100 transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-richblack-800 rounded-xl border border-richblack-700 p-6 w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-800 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-200 text-lg">!</span>
              </div>
              <h2 className="text-xl font-semibold text-richblack-5">
                Delete Account
              </h2>
            </div>

            {/* Modal Body */}
            <p className="text-richblack-200 mb-2">
              Are you sure you want to delete your account?
            </p>
            <p className="text-richblack-400 text-sm mb-6">
              This action is permanent and cannot be undone. All your data, courses, and progress will be lost.
            </p>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 font-medium hover:bg-richblack-600 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex-1 px-4 py-2 rounded-lg bg-pink-700 text-white font-medium hover:bg-pink-600 transition-all disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;