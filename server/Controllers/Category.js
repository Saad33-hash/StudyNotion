//get the tag model
const Category=require("../Models/Category")
const Course=require("../Models/Course");
//write api for create tag or handler for create tag


//handler function for createting tag
const createCategory=async(req,res)=>{
//1.get name and description from req ki body
//2.valdation check if user provide necessary info
//3.create entry in dbb
    try{
        //1.get name and description from req ki body
    const {names,description}=req.body;
    //2.valdation check if user provide necessary info
    if(!names || !description){
        return res.status(401).json({
            success:false,
            message:"Please fill all the information"
        })
    }
    //3.create entry in dbb
    const creatingCategory=await Category.create({
        names:names,
        description:description
    })

     return res.status(200).json({
        success:true,
        message:"Category created Successfully!",
       
    })
    
    }
    catch(err){
return res.status(400).json({
    success:false,
    message:err.message
})
    }
}

//handler function  for get all tags
//1.we dont want to find on basis of any argumnet right now.
//1.but we wnat to include name and escription i every tag taht is fetched
const getAllCategory=async (req,res)=>{
    try{
    const fetchCategory=await Category.find({},{names:1,description:1});
    //we have to use include flad if we wnat to include somethinga nd 0 if exclude if we want alld ata
    //return a response
    return res.status(200).json({
        success:true,
        message:"All categories fetched successfullt",
        category:fetchCategory
        })
    }
    catch(err){
return res.status(400).json({
    success:false,
    message:err.message
})
    }
}

/*
//handle function for category all detail
//get category id
//aik catgeory kay correspond jitney course hain uney get kr lo
//validation for actegory id through which getting course if
//gte courses of other category
//courses which other people are also buying
const getCategoryPageDetails=async(req,res)=>{
    try{
   const { categoryId } = req.params;

  // const userID=req.user.id;
  // if(!userID){
  //  return res.status(400).json({
  //      success:false,
  //      message:"User ID not found!"
   // })
   //}
   const selectedCategory=await Category.findById(categoryId).populate("Course").exec();
   if(!selectedCategory){
    return res.status(404).json({
        success:false,
        message:"Course in this category not found!"
    })
   }

   const otherCategories=await Category.findById(
    {
        _id:{$ne:categoryId}
    }
   ).populate("course").exec()

   //get top selling course
   //dependupon max course sold
   //get the filed for enrolled student in your model
   //whenevr stiudent enrolled increase the counter
   //show the courses

   //I will fetch course details->the course details conatiner student enrolled->pass the user id->check the user id if found increase the count
   

 

   const getTopSellingCourse=await Course.aggregate(
    [
        {
           $addFields:{
            enrolledCount:{$size:"$enrolledStudent"}
        }
        },
        {
            $sort:{enrolledCount:-1},
        },
        { 
                $limit:10
        }
       
    ]
   )

   return res.status(200).json({
    success:true,
    message:"Category Page details ahs been fteched successfully!",
    data:{
        selectedCategory,
        otherCategories,
        //top selling course
        getTopSellingCourse
    }
   })
    }
    catch(error){

    }
}
    */
const getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Populate course with nested ratingAndReview and instructor
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: [
          { path: "ratingAndReview" },
          { path: "instructor", select: "firstName lastName image" }
        ]
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }

    // Use find() not findById() for multiple results
  // Other categories with nested populate
    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: [
          { path: "ratingAndReview" },
          { path: "instructor", select: "firstName lastName image" }
        ]
      })
      .exec();

   // Top selling courses - use find with populate instead of aggregate
    const getTopSellingCourse = await Course.find({ status: "Published" })
      .sort({ enrollmentCount: -1 })
      .limit(10)
      .populate("ratingAndReview")
      .populate("instructor", "firstName lastName image")
      .populate("category", "names")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Category Page details fetched successfully!",
      data: {
        selectedCategory,
        otherCategories,
        getTopSellingCourse,
      },
    });
  } catch (error) {
    // THIS WAS EMPTY - that's why request was hanging!
    console.log("Error in getCategoryPageDetails:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports={createCategory,getAllCategory,getCategoryPageDetails}


//for contact us page first send the email to you with the data 
//second the emial to the user for confirmation

//write all the routes
