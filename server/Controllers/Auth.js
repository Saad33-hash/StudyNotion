//fetching necessary models
const User=require("../Models/User");
const OTP=require("../Models/OTP");
const Profile=require("../Models/Profile")
const otpGenerator = require('otp-generator')
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
const { mailSender } = require("../Utils/mailSent");




//four handlers function
//sendotp
//signup
//login
//changepassword



//controller for sendotp
const sendOTP=async(req,res)=>{
    try{
//sb say phelay request ki body say emial fetch kr lay bhai
const {email}=req.body;
//checking if I am getting email in req.bod
console.log("Here is the email",req.body)
//check whether email exists or not already
const checkEmail=await User.findOne({email});
//if user already exist then send a reposnse
if(checkEmail){
    return res.status(401).json({
        success:false,
        message:"User already exist"
    })
}

//now we have to send the opt beacuse user is new
var otpgenerate=otpGenerator.generate(6, { upperCaseAlphabets: false,
    lowerCaseAlphabets:false,
     specialChars: false });
//prinying waht our otpgenerator looks like
console.log("otp gernated",otpgenerate);

//We hevae to chekc wther the otp is present in our db or not.now we have to make sure evry time unique otp is generated. Why we did OPT.findone beacuse we need to checm email from database
let uniqueOTP=await OTP.findOne({otp:otpgenerate}) ;
//now we will make sure unqiue otp is generated
while(uniqueOTP){
   otpgenerate= otpGenerator.generate(6, { upperCaseAlphabets: false,
    lowerCaseAlphabets:false,
     specialChars: false });
} 
//generate otp and check in db whether present or not
 uniqueOTP=await OTP.findOne({otpgenerate:otpgenerate}) ;

 //now we have to send the otp and we need things we define in databse to send otp
 const otpPayload={email,otp:otpgenerate};
 //now creaet the entry for otp in database
 const newOTPBody=await OTP.create(otpPayload);
 console.log("here comes the otp stored in db",newOTPBody);
 //now sending a reponse
 return res.status(200).json({
    success:true,
    message:"OTP send successfully!",
    otpgenerate
    
 })
    }
    catch(err){
        console.log(err.message)
return res.status(500).json({
    success:false,
    message:err.messge
})
    }
}


//signup

const signUp=async(req,res)=>{
    try{
//fethc all the values from request ki body
const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp
}=req.body;

// ✅ Log each extracted field
        console.log("Extracted fields:");
        console.log("firstName:", firstName);
        console.log("lastName:", lastName);
        console.log("email:", email);
        console.log("accountType:", accountType);
        console.log("contactNumber:", contactNumber);
        console.log("otp:", otp);

        
//check kro kya req ki body may say sb kuch aa rha hian
if(!firstName || !lastName || !email || !password ||!confirmPassword || !accountType || !contactNumber || !otp){
    return res.status(400).json({
        success:false,
        message:"Please fill all the information!"
    })

}
//check kro kay passowrd match hain ya nahi
if(password !== confirmPassword){
    return res.status(401).json({
        success:false,
        message:"Password and match password should be same!"
    })
}
//check kro user already exists or not
const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(409).json({
        success:false,
        message:"User already exists"
    })
}
//find most recent otp  ->check the length->check if the otp user entered and the otp recently gneratlety matches or not
const recentOTP=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
console.log("let me show you you otp",recentOTP);
if (!recentOTP) {
    return res.status(400).json({
        success: false,
        message: "OTP not found",
    });
} else if (otp !== recentOTP.otp) {
    return res.status(400).json({
        success: false,
        message: "Invalid OTP",
    });
}
//hasehed the passowrd

let hashedPassword=await bcrypt.hash(password,10);
//create entry in db of user profile with name,conatct otp and things. We rember we have to give user fprofile in additional details so creaete user profile 
//jb hum db may entry create kr rhy they to hmey yaad aya kay yr hmra user to profle ko refener kr rha hota ha to hmey aik profle bhi create krni prey gie for each user
  // Create the user
    let approved = ""
    approved === "Instructor" ? (approved = false) : (approved = true)

const profileDetails=await Profile.create({
gender:null,
about:null,
dateOfBirth:null,
contactNumber:null
})

//cerating user
const user= await User.create({
      firstName,
    lastName,
    email,
    password:hashedPassword,
    accountType:accountType,
    approved:approved,
    contactNumber,
    addittionalDetails:profileDetails._id,
    image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName}${lastName}JS&size=128`,
})

//response tstaus 
return res.status(200).json({
    success:true,
    message:"User created successfully",
    User:user
})

    }
    catch(error){
        console.log("error coming from catch block of signUp function in controoler",error)
return res.status(500).json({
    
    success:false,
    message:error.message
})
    }    
}

const logIn=async (req,res)=>{
    //sab say phelay body say eil id fetch kr lo ga for validation
    //check kro ga if email or password filled or not
    //then compare kro ga passwords ko
    //agr to passowrd theek hain to aik token genrate kro do ga using toke.sgin us may payload options or secret bhjo ga
    //sath may rpeonse may cookie bhj do ga
    //agr password match nahi hota tu likho ga passowrd does not match
    try{
const {email,password}=req.body;
console.log(email,password);

//filling info
if(!email || !password){
    return res.status(400).json({
        success:false,
        message:"Please fill all the information"
    })
}
//checking userr
const user=await User.findOne({email}).populate("addittionalDetails");
if(!user){
    res.status(400).json({
        success:false,
        message:"User does not exist.Please create account" })
}
//now chekcing password
if(await bcrypt.compare(password,user.password)){
    //now genrate a token
    const payLoad={
        //is option may hum woh cheezein bhjety hain jo hum nay token generate krtey waqt bhjni hian
        id:user._id,
        email:user.email,
        accountType:user.accountType,
    }
    const token=jwt.sign(payLoad,process.env.JWT_SECRET,{
        expiresIn:"2h"
    });

    user.token=token;
    delete user.password;

    const options={
        httpOnly:true,
        expires:new Date(Date.now() + 3*24*60*60*1000)
    }

    //npow sending a reponse in cookie
    res.cookie("token",token,options).json({
        success:true,
        token,
        user,
        message:"Logged In cls successfully"

    })

}
else{
    
    return res.status(401).json({
        success:false,
        message:"password is incorrect"
    })
}

}

    
    catch(error){
 console.log(error.message)
return res.status(500).json({
    success:false,
    message:error.messge
})
    }
}

const changePassword=async (req,res)=>{
   try {
    //get email passowrd from request ki body
    //validate passowrd if password or currentpassowrd matches or not
    //updatepassword in db
    //sendmail
    //return responee
    const { oldpassword, password, confirmPassword } = req.body;

    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const macthedPassword = await bcrypt.compare(oldpassword, user.password);
    if (!macthedPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Passowrd does not match confirm password",
      });
    }

    const newPassword = await bcrypt.hash(password, 10);
    user.password = newPassword;

    await user.save();
    await mailSender(
      user.email,
      "Password change request",
      "Password change successfully"
    );
    return res.status(200).json({
      success: true,
      message: "Password chnages successfully",
    });
  } catch (error) {
    console.log("error in catch of chnage password change of auth.js", error);
    return res.status(400).json({
      success: false,
      message: "error in chnage passsowrd function in Auth.js",
    });
  }
}
module.exports={sendOTP,signUp,logIn,changePassword}
