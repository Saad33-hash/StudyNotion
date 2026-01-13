const {
  Schema,
  model,
} = require("mongoose");
const mongoose=require("mongoose")
const sectionSchema = new Schema({
  sectionName: {
    type: String,
   
  },
  subSection:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "SubSection"
  }]
});

const sectionModel = model("Section", sectionSchema)

module.exports = sectionModel