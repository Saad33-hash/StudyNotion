const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

//authenctication
const auth = async (req, res, next) => {
  try {
    //sab say phelay token fetch kry gay
    const token =
      req.body?.token ||
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

      console.log("BODY:", req.body);
console.log("COOKIES:", req.cookies);
console.log("AUTH HEADER:", req.headers["authorization"]);


    //agr token anhi milta to likho token does not foun
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token does not found",
      });
    }
    try {
      //ab hum nay token ko verify krna ha ta kay hum used decode kry kay user kay andar daal sky to us ka role fetch kr sky
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
       next();
    } catch (error) {
      console.log("Erro of try block of decode in auth function", error);
      return res.status(401).json({
        success: false,
        message: "Token is inavlid",
      });
    }
   
  } catch (error) {
    console.log("Error in the ctahc block of auth", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed!",
    });
  }
};

//istsudentmiddleware
//first:you can use payload like if(role=req.user.role)
//second:you can make db call
const isStudent=(req,res,next)=>{
    try{
if(req.user.accountType !== "Student"){
    return res.status(400).json({
        success:false,
        message:"This route is specified for students"
    })
}
next();
    }
    catch(error){
return res.status(500).json({
    success:false,
    message:"Role cannoit be verified try again!"
})
    }
}

//iadminmiddlware
const isAdmin=(req,res,next)=>{
    try{
if(req.user.accountType !== "Admin"){
    return res.status(401).json({
        success:false,
        message:"This route is specifief for admin"
    })
}
next();
    }
    catch(error){
return res.status(500).json({
    success:false,
    message:"Role cannoit be verified try again!"
})
    }
}

//isInstructor middlewate
const isInstructor=(req,res,next)=>{
    try{
if(req.user.accountType !== "Instructor"){
    return res.status(401).json({
        success:false,
        message:"This route is specifief for Instructor"
    })
}
next();
    }
    catch(error){
return res.status(500).json({
    success:false,
    message:"Role cannoit be verified try again!"
})
    }
}

module.exports={auth,isStudent,isAdmin,isInstructor};