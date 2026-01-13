const { Schema, model, } = require("mongoose");
const mongoose=require("mongoose")
const CategorySchema = new Schema({
  names: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  course:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }]
});

const CategoryModel = model("Category", CategorySchema);

module.exports = CategoryModel;
