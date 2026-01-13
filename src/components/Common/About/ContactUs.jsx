import React from "react";
import { useForm } from "react-hook-form";
import countries from "../../../data/countrycode.json";

import toast from "react-hot-toast";
import { Contact } from "../../../Services/operation/contactUs";
const ContactUs = () => {
  const {
    register,
      formState: { errors, isSubmitting },  
    handleSubmit,
  } = useForm();
  const onSubmit = async(data) => {

    console.log("here is the data",data)
    try{
     const response = await Contact(data);
    console.log("Here is the response from contact us page",response);
    if(response?.success){
    toast.success("Respond has been sent successfully")
    }
   else{
    toast.error("Issue sending the reponse")
    
   }
   
    }
    catch(error){
  
    console.log(" Error message:", error.response?.data?.message);
    toast.error(error.response?.data?.message || "Failed to send message");
    }
    
  };

  return (
  <div className="flex justify-center items-center w-full px-4 py-8">
  <form 
    className="flex flex-col gap-4 w-full max-w-2xl" 
    onSubmit={handleSubmit(onSubmit)}
  >
    {/* First and Last Name */}
    <div className="flex flex-col md:flex-row gap-4">
      {/* First Name */}
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-richblack-200 text-sm font-light">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter first name"
          className="bg-richblack-800 p-3 rounded-lg text-richblack-5 
                     focus:outline-none focus:ring-2 focus:ring-yellow-50
                     border border-richblack-700 w-full"
          {...register("firstName", { required: "First name is required" })}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-richblack-200 text-sm font-light">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter last name"
          className="bg-richblack-800 p-3 rounded-lg text-richblack-5 
                     focus:outline-none focus:ring-2 focus:ring-yellow-50
                     border border-richblack-700 w-full"
          {...register("lastName", { required: "Last name is required" })}
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>
    </div>

    {/* Email Address */}
    <div className="flex flex-col gap-2">
      <label className="text-richblack-200 text-sm font-light">
        Email Address <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        placeholder="Enter email address"
        className="bg-richblack-800 p-3 rounded-lg text-richblack-5 
                   focus:outline-none focus:ring-2 focus:ring-yellow-50
                   border border-richblack-700 w-full"
        {...register("emailAddress", { 
          required: "Email address is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
        aria-invalid={errors.emailAddress ? "true" : "false"}
      />
      {errors.emailAddress && (
        <p className="text-red-500 text-sm">{errors.emailAddress.message}</p>
      )}
    </div>

    {/* Phone Number */}
    <div className="flex flex-col gap-2">
      <label className="text-richblack-200 text-sm font-light">
        Phone Number <span className="text-red-500">*</span>
      </label>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Country Code Select */}
        <select 
          {...register("countryCode", { required: true })}
          className="bg-richblack-800 p-3 rounded-lg text-richblack-5 
                     focus:outline-none focus:ring-2 focus:ring-yellow-50
                     border border-richblack-700 w-full sm:w-32"
        >
          {countries.map((element, index) => (
            <option key={index} value={element.code}>
              {element.code} - {element.country}
            </option>
          ))}
        </select>
   
        {/* Phone Number Input */}
        <input
          type="tel"
          placeholder="12345 67890"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Please enter a valid phone number (10-15 digits)"
            }
          })}
          className="bg-richblack-800 p-3 rounded-lg text-richblack-5 
                     focus:outline-none focus:ring-2 focus:ring-yellow-50
                     border border-richblack-700 flex-1"
        />
      </div>
      {errors.phoneNumber && (
        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
      )}
    </div>

    {/* Message */}
    <div className="flex flex-col gap-2">
      <label className="text-richblack-200 text-sm font-light">
        Message <span className="text-red-500">*</span>
      </label>
      <textarea 
        {...register("message", { required: "Message is required" })} 
        rows={5}
        placeholder="Enter your message..."
        className="bg-richblack-800 p-3 rounded-lg text-richblack-5 
                   focus:outline-none focus:ring-2 focus:ring-yellow-50
                   border border-richblack-700 w-full resize-none"
      />
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message.message}</p>
      )}
    </div>

    {/* Submit Button */}
    <button 
      type="submit" 
      disabled={isSubmitting}
      className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg 
                 font-semibold hover:bg-yellow-100 transition-all
                 disabled:opacity-50 disabled:cursor-not-allowed
                 w-full sm:w-auto sm:self-center "
    >
      {isSubmitting ? "Sending..." : "Send Message"}
    </button>
  </form>
</div>

  );
};

export default ContactUs;
