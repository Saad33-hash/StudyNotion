const {
  Schema,
  model
} = require("mongoose");
const mongoose=require("mongoose");
const { mailSender } = require("../Utils/mailSent");
const sendVerificationTemplate=require("../Mail/Templates/emailVerificationTemplate")
const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
    
  },
  otp:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires:5*60
  },
});

async function sendVerificationEmial(email,otp) {
    try{
const response=await mailSender(email,"Verification Emial from studyNotion",sendVerificationTemplate(otp));
console.log("respone coming from email verification in OTP.js",response);    
    }
    catch(error){
console.log("error coming from mailsender function in otp.js",error);
    }

}

//pre middle ware
//middleware name . type ("method",function())
OTPSchema.pre("save",async function(next){
    await sendVerificationEmial(this.email,this.otp);
    next();
})

const TaskModel = model("OTP", OTPSchema)

module.exports = TaskModel