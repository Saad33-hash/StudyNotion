//gte profile model
//get user model
const Profile=require("../Models/Profile");
const User=require("../Models/User");
const Course=require("../Models/Course")
const { options } = require("../Routes/profileRoutes");
const imageUpload=require("../Utils/imageUploader")
require("dotenv").config();
const updateProfile=async (req,res)=>{
    try{
    //get dtaat
    //get user id
    //vaidate data
    //findprofile -> we dont have profile id. Yes,but we have user id so we egt user details. If we get user details
    //can we find profileid. Yes,user profile is stroed in additionaldetails in user model. If we get profile id can we get profile details? Yes, we can. So get it 
    //update profile
    const {dateOfBirth="",about="",gender,contactNumber}=req.body;
    const id=req.user.id; //how we get it? In our payload we decode teh value and put into the user
    if( !gender || !contactNumber || !id){
    return res.status(400).json({
        success:false,
        message:"Please fill in all the information!"
    })
    }

    const userDetails=await User.findById(id);
    const profileId= userDetails.addittionalDetails;
    const profileDetails=await Profile.findById(profileId);

    //now we have to update profile. WE have to save the profile beacuse we already created aon object for this profile
    //if we didnt create object for this profile then we have to create it in database
    profileDetails.contactNumber=contactNumber;
    profileDetails.gender=gender;
    profileDetails.about=about;
    profileDetails.dateOfBirth=dateOfBirth;

    await profileDetails.save();


    //now sending reponse
    return res.status(200).json({
        success:true,
        message:"Profile Updated successfully!",
        profile:profileDetails
    })
    }
    catch(error){
   return res.status(500).json({
    success:false,
    message:"Profile can not be updated!"
   })
    }
}


const updateProfilePicture=async(req,res)=>{

    //get user id
    //get profile id
    //get the file
    //validate 
    //genrate a reponse

    try{
    const userID=req.user.id;
    
    if(!userID){
        return res.status(400).json({
            success:false,
            message:"User id not found"
        })
    }
    
//if will fetch the file first and then update
const imageFile=req.files.imageUpload;
if(!imageFile){
    return res.status(400).json({
        success:false,
        message:"Image can not be fetced!"
    })
}

   //first upload image to cloudinary and then update the url in db
      const uploadToCloudinary=await imageUpload.uploadImageToCloudinary(imageFile,process.env.FOLDER_NAME,300,80)
     if(!uploadToCloudinary){
        return res.status(400).json({
            success:false,
            message:"Image can not be uploaded to cloudinary"
        })
     }
    

    //checking if user exist with that profile
    const existingUser=await User.findByIdAndUpdate(
    userID,
       {image:uploadToCloudinary.secure_url},
    {new:true}
    )
 
    if(!existingUser){
        return res.status(400).json({
            success:false,
            message:"User does not exist"
        })
    }

  //findbyidand update save the document too this line is redudnt here

//  existingUser.save();
    //now user exist so we have to find the profile details according to the user beacuse we can updte the profile in additionaldetaisl
    //retruning a repone
    return res.status(200).json({
        success:true,
        message:"Image Updated successfully!",
        Image:uploadToCloudinary.secure_url
    })

    }
    catch(error){
console.log("error in the ctach block of update profile",error.message);
return res.status(500).json({
    success:false,
    message:"Something went wrong!"
})
    }
}

const deleteProfile=async(req,res)=>{
    try{
//get data
//validate
//delete profile
//now delete user
//return response

const id=req.user.id;
const userDetails=await User.findById(id);
if(!userDetails){
    return res.status(400).json({
        success:false,
        message:"User does not found"
    })
}

//deleting profile
const deletingProfile=await Profile.findByIdAndDelete({_id:userDetails.addittionalDetails});
//ToDO:unenroilled the no. of students enrolled
 const unenrollingStudent=await Course.updateMany(
      { id },
      { $pull:
         { studentsEnrolled: id }
         },
         {new:true}
    );
//delete user
const deletingUser=await User.findByIdAndDelete({_id:id});
//returnning reponse
return res.status(200).json({
    success:true,
    message:"User deleted successfully",
    data:deleteProfile
})

    }
    catch(error){
        console.log("error in ctahc block of delete profile",error.message)
return res.status(500).json({
    success:false,
    message:"User cannot be deleted"
})
    }
}

const getAllUserDetails=async(req,res)=>{
    try{
const userID=req.user.id;
if(!userID){
    return res.status(401).json({
        success:false,
        message:"User di not found!"
    })
}

//get all user details
const userDetails=await User.findById(userID).populate("addittionalDetails").exec();
if(!userDetails){
    return res.status(404).json({
        success:false,
        message:"No information be fetched in accordance with this user id"
    })

}

return res.status(200).json({
    success:true,
    message:"All data against the userID has been fetched successfully!",
    userData:userDetails
})
    }
    catch(error){
console.log("Error in catch block of userDetails:",error);
return res.status(500).json({
    success:false,
    message:"Something went wrong!"
})
    }
}


//write a function for getalldetails for user
//const userDetails=await User.findbyid(id).populate(additionalinfomation).exec()
const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: [
          { path: "instructor", select: "firstName lastName" },
          { path: "ratingAndReview" },
          {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        ],
      })
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      data: userDetails.courses,
    });
  } catch (error) {
    console.log("Error in getEnrolledCourses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
    });
  }
};
module.exports={updateProfile,updateProfilePicture,deleteProfile,getAllUserDetails,getEnrolledCourses}