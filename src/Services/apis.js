//mention our link
export const BASE_URL=process.env.REACT_APP_BASE_URL



export const categories={
    CATEGORIES_API:BASE_URL+"/Courseroutes/getAllCategory",
    CATEGORY_PAGE_API: BASE_URL + "/Courseroutes/getCategoryPageDetails",
    COURSE_DETAILS_API: BASE_URL + "/Courseroutes/getCourseDetails",
    //COURSE_DETAILS_API: BASE_URL + "/Courseroutes/getASpecificCourse",
}

export const authAPI={
    LOGIN_API:BASE_URL+"/auth/login",
    SIGNUP_API:BASE_URL+"/auth/signUp",
    SEND_OTP:BASE_URL+"/auth/sendOTP",
    RESET_PASSWORD_LINK:BASE_URL+"/auth/resetPasswordToken",
    RESET_PASSWORD:BASE_URL+"/auth/resetPassword",
    CHANGE_PASSWORD: BASE_URL + "/auth/changePassword",
}

export const profileAPI = {
    UPDATE_PROFILE: BASE_URL + "/profile/updateProfile",
    UPDATE_PROFILE_PICTURE: BASE_URL + "/profile/updateProfilePicture",
    DELETE_PROFILE: BASE_URL + "/profile/deleteProfile",
    GET_ALL_USER_DETAILS: BASE_URL + "/profile/getAllUserDetails",
}

export const contactUsApi={
    CONTACT_US:BASE_URL+"/contact/contactUsForm"
}