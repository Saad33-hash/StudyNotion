 const {
  Schema,
  model,

} = require("mongoose");
const mongoose=require("mongoose")

const RatingAndReviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User"
  
  },
  rating:{
type:Number,
required:true,

  },
  reviews:{
    type:String,
    trim:true,
  },
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Course",
    required:true
  }

});

const RatingAndReviewModel = model("RatingAndReview", RatingAndReviewSchema)

module.exports = RatingAndReviewModel