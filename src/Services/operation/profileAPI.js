import { apiConnector } from "../apiConnector";
import { profileAPI, authAPI } from "../apis";
import toast from "react-hot-toast";

const {
  UPDATE_PROFILE,
  UPDATE_PROFILE_PICTURE,
  DELETE_PROFILE,
  GET_ALL_USER_DETAILS,
} = profileAPI;

const { CHANGE_PASSWORD } = authAPI;

// Update Profile (gender, dateOfBirth, about, contactNumber)
export const updateProfile = async (token, data) => {
  const toastId = toast.loading("Updating profile...");
  let result = null;

  try {
    const response = await apiConnector("PUT", UPDATE_PROFILE, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("UPDATE_PROFILE response:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile updated successfully");
    result = response.data;
  } catch (error) {
    console.log("UPDATE_PROFILE error:", error);
    toast.error(error?.response?.data?.message || "Failed to update profile");
  }

  toast.dismiss(toastId);
  return result;
};

// Update Profile Picture
export const updateProfilePicture = async (token, formData) => {
  const toastId = toast.loading("Updating profile picture...");
  let result = null;

  try {
    const response = await apiConnector("POST", UPDATE_PROFILE_PICTURE, formData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    console.log("UPDATE_PROFILE_PICTURE response:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile picture updated successfully");
    result = response.data;
  } catch (error) {
    console.log("UPDATE_PROFILE_PICTURE error:", error);
    toast.error(error?.response?.data?.message || "Failed to update profile picture");
  }

  toast.dismiss(toastId);
  return result;
};

// Delete Profile/Account
export const deleteProfile = async (token, userId) => {
  const toastId = toast.loading("Deleting account...");
  let result = null;

  try {
    const response = await apiConnector("DELETE", `${DELETE_PROFILE}/${userId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETE_PROFILE response:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Account deleted successfully");
    result = response.data;
  } catch (error) {
    console.log("DELETE_PROFILE error:", error);
    toast.error(error?.response?.data?.message || "Failed to delete account");
  }

  toast.dismiss(toastId);
  return result;
};

// Get All User Details
export const getAllUserDetails = async (token) => {
  let result = null;

  try {
    const response = await apiConnector("GET", GET_ALL_USER_DETAILS, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_ALL_USER_DETAILS response:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data;
  } catch (error) {
    console.log("GET_ALL_USER_DETAILS error:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch user details");
  }

  return result;
};

// Change Password
export const changePassword = async (token, data) => {
  const toastId = toast.loading("Changing password...");
  let result = null;

  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CHANGE_PASSWORD response:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password changed successfully");
    result = response.data;
  } catch (error) {
    console.log("CHANGE_PASSWORD error:", error);
    toast.error(error?.response?.data?.message || "Failed to change password");
  }

  toast.dismiss(toastId);
  return result;
};