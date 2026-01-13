const { Schema, model } = require("mongoose");
const mongoose=require("mongoose")
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  active:{
    type: String,
    trim:true,
  },
  approved:{
    type:String, 
    required:true,
    trim:true
  },

  password:{
     type: String,
    required: true,
  },
  accountType:{
    type:String,
    enum:["Student","Instructor","Admin"],
    trim:true
  },
   contactNumber: {  // ✅ Add this field
    type: String,
    trim: true,
  },
  
  addittionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Profile"
  },
  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
  }],
  image:{
    type:String,
    required:true,
   trim:true
  },
  token:{
    type:String,
   
  },
  resetPasswordExpires:{
    type:String
  },
  courseProgress:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courseProgress"
  }]

});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
