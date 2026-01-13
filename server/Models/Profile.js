const {
  Schema,
  model
} = require("mongoose");
const mongoose=require("mongoose")

//gender,dateofbirth,phonenumber,about

const ProfileSchema = new Schema({
  gender: {
    type: String,
    trim:true

  },
 dateOfBirth:{
    type:String,
    trim:true
    
 },
 about:{
    type:String,
    trim:true
 },
 contactNumber:{
    type:Number,
    
    trim:true
 }
});

const ProfileModel = model("Profile", ProfileSchema)

module.exports = ProfileModel