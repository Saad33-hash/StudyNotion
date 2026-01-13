
import { useForm } from "react-hook-form";
import countries from "../../../data/countrycode.json";
import "react-phone-number-input/style.css";
const PhoneNumber = () => {
  const {
    register,
    formState: { errors },
  
  } = useForm();
  

  return (
    <div>
      <p className="text-richblack-25">
        Phone Number<span className="text-red-600">*</span>
      </p>
      
     <div className="flex gap-4">
      <select className="p-2 rounded-lg bg-richblack-600 w-[25%] 
                         text-richblack-5 focus:outline-none focus:ring-2 
                         focus:ring-yellow-50" >
      {countries.map((element,index)=>{
        return(
          <option  key={index} className="overflow-hidden">
        {element.code} {"-"} {element.country} 
          </option>

        )
      })}

      </select>
     

      <input
        type="tel"
        placeholder="Enter your phone number"
       
        {...register("contactNumber", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10,15}$/,
            message: "Please enter a valid phone number",
          },
        })}
        className="p-2 rounded-lg bg-richblack-600 w-full 
                         text-richblack-5 focus:outline-none focus:ring-2 
                         focus:ring-yellow-50"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      )}

      </div>
    </div>
  );
};

export default PhoneNumber;
