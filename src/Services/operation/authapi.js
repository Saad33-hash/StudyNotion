import { apiConnector } from "../apiConnector"
import { authAPI } from "../../Services/apis"
import { toast } from "react-hot-toast"

const {
  SIGNUP_API,
  RESET_PASSWORD_LINK,
  RESET_PASSWORD
} = authAPI;





//the data im passing here is the paatrmter i recieve from obsubkut and then i fetch the email from it using data.email
export const sendotp = async (data) => {

  try {
    const response = await apiConnector("POST", authAPI.SEND_OTP, {
      email: data.email,

    })

    console.log("Here is the reponse", response?.data);
    if (response?.data?.success) {
      console.log("inside navigate check")
      console.log(response.data)
      return response.data;
    }
  }
  catch (error) {
    console.log("Here is the error", error);
  }


}

export const signUp = async (data) => {

  try {
    console.log("I am insde signup route")
    const response = await apiConnector("POST", SIGNUP_API, data);
    if (response?.data?.success) {
      toast.success("User Signed In successfully!");
      return response;
    }
    else {
      toast.error(response?.data?.message || "Signup failed");
      return response.data;
    }
  }
  catch (error) {
    console.log("Error in the catch block", error)

  }

}

export const login = async (data) => {
  try {
    const result = await apiConnector("POST", authAPI.LOGIN_API, data);
    if (result?.data?.success) {
      console.log("I am inside authi api of login");
      return result;
    }

  }
  catch (error) {
    console.log("Error in catch block of login", error)
  }
}

//resetpassowrd link
export const resetPasswordLink = async (data) => {
  try {
    const response = await apiConnector("POST", RESET_PASSWORD_LINK, data);
    console.log("here is the reponse from authapi of resetpassowrdlink", response?.data);
    return response.data;
  }
  catch (error) {
    console.log("error in catch block of resetpassword authapi.js", error.response?.data?.message || error.message)
  }
}

export const resetPassword = async (finalData) => {
  try {
    const result = await apiConnector("POST", RESET_PASSWORD, finalData);
    console.log("response from reset password", result)
    return result.data;
  }
  catch (error) {
    console.log("Error in catch block of reset password api", error.message);
  }
}