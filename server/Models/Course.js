const {
  Schema,
  model
} = require("mongoose");
const mongoose=require("mongoose")

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    trim:true,
  },
 description:{
     type: String,
    required: true,
    trim:true,
 },
 instructor:{
     type:mongoose.Schema.Types.ObjectId,
    ref:"User"
 },
 courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
 }],
 whatYoulearn:{
    type:String,
    required:true,
    trim:true,
 },
 thumbnail:{
    type:String,
    required:true,
    trim:true
 },
 tag:{
  type:[String],
  required:true
 },
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
} ,
studentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    required:"true",
    ref:"User"
}],
enrollmentCount:{
  type:Number,
  default:0,
  required:true
},
Price:{
    type:Number,
    required:true,
    trim:true
},
ratingAndReview:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"RatingAndReview"
}],
status:{
  type:String,
  enum:["Draft","Published"],
},
language:{
  type:String,
  default:"English",
},
createdAt: {
		type:Date,
		default:Date.now
	},
});

const CourseModel = model("Course", CourseSchema)

module.exports = CourseModel