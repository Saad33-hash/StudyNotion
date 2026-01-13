//get model
const Course=require("../Models/Course")
//gte tag
const Category=require("../Models/Category")
//get user
const User=require("../Models/User")
//import cloudinary
const imageUploader=require("../Utils/imageUploader")
const cloudianry=require("cloudinary").v2;

//handler for create course
//daat fetch
//file fetch->which is thumbnail
//autherization of instructor->why we need to validate instructor here?
//validation for tag
//upload image to cloudianry
//then create course in db
//aslo create course in user schema
//add course entry to tag
//return response
const createCourse=async(req,res)=>{
    try{
//get all the data from reuest ki body
const {courseName,description,whatYoulearn,Price,tags,category}=req.body;
//now fetch the file
const thumbnail=req.files.thumbnailImage;
//now get the instructor id beacuse instructor is an object id
const userId=req.user.id;

// todo:user i and instructor id will be same so when find and fecth in testing removes it

//now instructor details->check wether the instructor with such detail present in the db or not
const instructorDetails=await User.findById(userId);
if(!instructorDetails){
    return res.status(404).json({
        success:false,
        message:"Instructor not found"
    })
}
//now getting the tag. When we are fetching the tagbits an object id in our model so when we fetch it in our request body it is fetched as an id 
const categoryDetails=await Category.findById(category);
if(!categoryDetails){
    return res.status(404).json({
        success:false,
        message:"Category does not found"
    })
}

//now uploading image to cloudinary->the image we fetch from the file will be uplaoding
const image=await imageUploader.uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

//now cerating an entry for newcourse in db matlab kay abhi may nw course bananey laga huun
const newCourse=await Course.create({
    courseName,
    description,
    Price,
    whatYoulearn,
   // category:category._id,
    category: categoryDetails._id,
    //now we have to update that course or can say that hsown that course is made by which instructor
    instructor:instructorDetails._id,
    tag:tags, //kay bhai yae tag kay liye course banana hain
    thumbnail:image.secure_url
})

//now update the course in instructor schema
await User.findByIdAndUpdate(
    {
        _id:instructorDetails._id
    },
    //there is an array in course schema I have to push the course in his scehma so
    {
        $push:{
     courses:newCourse._id
        }
    },
    {new:true},

)

//update the same user schema here
 // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
         // courses: newCourse._id,
         course: newCourse._id, 
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)


//returning response
return res.status(200).json({
    success:true,
    message:"Course created successfully!",
    data:newCourse
})
    }
    catch(error){
console.log("error is ",error)
return res.status(500).json({
    success:false,
    message:error.message
})
    }
}

/*
//if user which can be instructor,admin or user who can see create will bet the user whose already logged in.
const showAllData=async(req,res)=>{
    try{
//fetch all the courses from the database
const findAllData=await Course.find({},{
    courseName:true,
    description:true,
    Price:true,
    ratingAndReview:true,
    thumbnail:true,
    students:true,
}).populate("instructor").exec();

return res.status(200).json({
    success:true,
    message:"All the courses information fetched successfully!",
    data:findAllData
})
    }
    catch(error){
console.log("errror in all courses fetch cathc block",error)
return res.status(500).json({
    success:false,
    message:"All courses data can not be fetched!"
})
}
}
*/

const showAllData = async (req, res) => {
    try {
        const findAllData = await Course.find({})
            .populate("instructor")
            .populate("ratingAndReview")
            .populate("category")
            .exec();

        return res.status(200).json({
            success: true,
            message: "All the courses information fetched successfully!",
            data: findAllData
        })
    }
    catch (error) {
        console.log("error in all courses fetch catch block", error)
        return res.status(500).json({
            success: false,
            message: "All courses data can not be fetched!"
        })
    }
}




//getallcourses handler function

//getallcoursesdetails
//sb say pehaly may course if find kro lo ga kyn kay hum course create kr cheuckey hain then Ill make sure kay id valid hain
//then I will check wther the course on suhc id present in iur database or not
//if yes then ill fetch allcoursedetails using object id and then popluate 
//gnerate a resonse
const getAllCourseDetails=async(req,res)=>{
    try{
//const {courseId}=req.body;
 const { courseId } = req.params;
 console.log("Received courseId:", courseId);
if(!courseId){
    return res.status(400).json({
        success:false,
        message:"Course  ID does not found"
    })
}

const gettingAlldetailsOfCourse=await Course.findById(
    courseId
)
.populate({
        path: "instructor",
        populate: {
          path: "addittionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()
      
if(!gettingAlldetailsOfCourse){
    return res.status(400).json({
        success:false,
        message:" course with this id does not exist"
    })
}

//genrrtae reponse
return res.status(200).json({
    success:true,
    message:"Cours details fetched successfully!",
    //showing data console
    data: gettingAlldetailsOfCourse,
})


    }
    catch(error){
console.log("Error in cathc block of getAll details of courses",error.message)
return res.status(500).json({
    success:false,
    message:"Something went wrong!"
})
    }
}

//getcourseDetails
//get course if drom request ki body
//validate
//find course through course id where data is stored in the form of object id so we have to populate
//return response
const getASpecificCourse=async(req,res)=>{
    try{
const  {courseId}=req.body;
//const  {courseId}=req.params;
const courseDetails=await Course.find(
    {_id:courseId}
).populate(
    {
        path:"instructor",
        populate:{
            path:"addittionalDetails"
        }
    }
).populate("category")
//uncommenting here
.populate("RatingAndReview")
.populate({
    path:"courseContent",
    populate:{
        path:"subSection",//path should match my schema 
        model:"SubSection" //while model should match model nae
        
    },
}).exec();

if(!courseDetails){
    return res.status(200).json({
        success:false,
        messgae:"Course details not found!"
    })
}

//genrrate a reponse
return res.status(200).json({
    success:true,
    message:"Course details fetched successfully",
    data:courseDetails
})
    }
    catch(error){
        console.log("Error in catch block of get a specific course details",error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong!"
        })

    }
}

module.exports={createCourse,showAllData,getAllCourseDetails,getASpecificCourse}