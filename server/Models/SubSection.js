const {
  Schema,
  model
} = require("mongoose");
const mongoose=require("mongoose")

const subSectionSchema = new Schema({
  title: {
    type: String,
   
  },
  description: {
    type: String, 
  },
  duration:{
    type:String,
  },
  videourl:{
    type:String,
  }

});

const subSectionModel = model("SubSection", subSectionSchema)

module.exports = subSectionModel