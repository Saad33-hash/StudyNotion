import { apiConnector } from "../apiConnector";
import { contactUsApi } from "../apis";


const {
    CONTACT_US
}=contactUsApi


//writting the fetch quiery
export const Contact=async (data)=>{
    try{
   const result=await apiConnector("POST",CONTACT_US,data);
   console.log("here is the result from contactus api.js",result.data);
   return result.data;
    }
    catch(error){

console.log("Error in catch block of Contact us.js",error.message)
    }
}