const Section = require("../Models/Section");
const subSection = require("../Models/SubSection");
const cloudinary = require("cloudinary").v2;
const ImageUploader = require("../Utils/imageUploader");
const fileUpload=require("express-fileupload");
const createSubSection = async (req, res) => {
  try {
    //get data from req. bdoy
    //we have video a file so we need to extract it
    //get validated
    //upload the file to cloudinary
    //create a sub section
    //update in sectio schema
    //return response
    const { title, description, duration, sectionId } = req.body;
    if (!title || !description || !duration || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the information",
      });
    }

    const videoFile = req.files.videourl;
    if (!videoFile) {
      return res.status(400).json({
        success: false,
        message: "Video url does not found",
      });
    }

  const uploadDetails=  await ImageUploader.uploadImageToCloudinary(videoFile, process.env.FILE_NAME);

    const newSubSection = await subSection.create({
      title: title,
      description: description,
      duration: duration,
      videourl: uploadDetails.secure_url,
    });

    const updateSection=await Section.findByIdAndUpdate(
        sectionId,
      {
        $push:{
            subSection:newSubSection._id
        }
      },
      {new:true},
    );

    //log updated section after populate query

    return res.status(200).json({
        success:true,
        message:"Sub section created successfully",
        data:updateSection
    })
  } catch (error) {
console.log("Error in ctahc block of createSub Section",error.message);
return res.status(500).json({
    success:false,
    message:"Something Went wrong"

})

  }
};


//HW:update and delete subsection 

const updateSubSection=async(req,res)=>{
  try{
  //get data from request ki body
  const {subSectionId}=req.body;
 // console.log("Received subSectionId:", subSectionId);  // ADD THIS
  //  console.log("Type:", typeof subSectionId);            // ADD THIS

  if(!subSectionId){
return res.status(400).json({
  success:false,
  message:"Subsection Id can not be found"
})
  }

 //i dint fetch the file then how its gonna update the url
  const videoFile=req.files.videourl;
  if(!videoFile){
    return res.status(200).json({
      success:false,
      message:"Video file cannot be found!"
    })
  }


   //gte title,description,duration,videoutl from req.body
  const {title,description,duration}=req.body;
  
  console.log("title here",title);
  if(!title || !description || !duration){
    return res.status(401).json({
      success:false,
      message:"fill fill in all the info!"
    })
  }

 

  const uploadingFile=await ImageUploader.uploadImageToCloudinary(videoFile,"codehelp",200,100);
  if(!uploadingFile){
   return res.status(400).json({
      success:false,
      message:"File can not be uploaded to cloudinary"
    })
  }

 
  //const existingSubSection = await subSection.findById(subSectionId);
//console.log("Found subsection:", existingSubSection);  // ADD THIS

//if (!existingSubSection) {
 // return res.status(404).json({
  //  success: false,
   // message: "Subsection not found with this ID"
  //});
//}

  const updatingSubSection=await subSection.findByIdAndUpdate(subSectionId,
  {
    
    title:title,
    description:description,
    duration:duration,
    videourl:uploadingFile.secure_url,
  },
  {new:true}
  )
  

  return res.status(200).json({
    success:true,
    message:"Sub section Updated successfully!",
    data:updatingSubSection
  })
  }
  catch(error){
    console.log(error.message);
return res.status(500).json({
  success:false,
  message:"sub Section does not updated successfully!"
})
  }
}


//delete subsection
const deleteSubSection=async(req,res)=>{
  try{
const {sectionId,subSectionId} = req.body;
if(!sectionId || !subSectionId){
  return res.status(400).json({
    success:false,
    message:"Subsection Id not found!"
  })
}

const deletingSubSection=await subSection.findByIdAndDelete(subSectionId);


const deleteingRefernceFromSection=await Section.findByIdAndUpdate(
sectionId,
  {
$pull:{

  subSection:subSectionId
}
  }
,
{new:true},  
)


const deletingsubSection=await subSection.findByIdAndDelete(subSectionId);
return res.status(200).json({
  success:true,
  message:"Subsection deleted successfully!",
  data:deletingsubSection

})
  }
  catch(err){
return res.status(500).json({
  success:false,
  message:"Sub section does not deleted successfully!",
  
})
  }
}

module.exports={createSubSection,updateSubSection,deleteSubSection}