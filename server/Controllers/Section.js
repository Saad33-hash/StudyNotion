const Course=require("../Models/Course");
const Section=require("../Models/Section");
//const subSection=require("../Models/SubSection")


const createSection=async(req,res)=>{
    try{
        //why courseID? we createed the course already so we will ahve course already already
    const {sectionName,courseId}=req.body;
    if(!sectionName || !courseId){
        return res.status(404).json({
            success:false,
            message:"All fields are required"
        })
    }
    const newSection=await Section.create({sectionName:sectionName});
    //pushing the section id to course conetnt
    const updatedCourse=await Course.findByIdAndUpdate(
        courseId,
        {
            $push:{
                courseContent:newSection._id
            }
        },
        {new:true}  
    )
    .populate({
        path:"courseContent",
        populate:{
            path:"subSection",
            model:"SubSection",
        }

    })
        .exec();
//how can I use populate function so I can populate section and subsection in updatecoursedetails
        

return res.status(200).json({
    success:true,
    message:"Section created successfully!",
   data:newSection,
   updatedSection:updatedCourse
})

    }
    catch(err){
return res.status(500).json({
    success:false,
    message:err.message
})
    }
}


const updateSection=async(req,res)=>{
    //data input
    //data validation
    //updatedata
    //retyur res
    try{
    const {sectionName,sectionId}=req.body;
    if(!sectionName || !sectionId){
        return res.status(404).json({
            success:false,
            messsage:"Data not found!"
        })
    }

    const updatingData= await Section.findByIdAndUpdate(
        sectionId,
        {sectionName:sectionName},
        {new:true}
    )

    return res.status(200).json({
        success:true,
        message:"Section Updated Successfully!",
        data:updatingData,
    })
    }
    catch(error){

        console.log("Error in update section handler",error);
        return res.status(500).json({
            success:false,
            message:"Someting went wrong!"
        })

    }
}

const deleteSection=async(req,res)=>{
    //get data from request ki body or through params
    //use findbyidandelete
    try{
    const {sectionId,courseId}=req.params;
    
    
    // Delete all subsections first
  //  await subSection.deleteMany({ _id: { $in: section.subSection } });

    
    const deletingSection = await Section.findByIdAndDelete(sectionId);
    //TODO:DO WE need to delete section from course schema!
    //yes totallwe need to delte the refernce object So there will no id against deleted object.Means the id for sectio will be remianing even the section is dleeted
    const deleteCourseFromSection= await Course.findByIdAndUpdate(
        courseId,
        {
            $pull:{
                courseContent:sectionId
            }
        },
        {new:true}
    )
    
    return res.status(200).json({
        success:true,
        message:"Section deleted Successfully!",
        data1:deletingSection,
        daat2:deleteCourseFromSection
    })
    }
    catch(error){
        console.log("Error occuring in delete section:",error)
        return res.status(500).json({
            success:false,
            message:"Section does not deleted."
        })

    }
}

module.exports={createSection,updateSection,deleteSection}