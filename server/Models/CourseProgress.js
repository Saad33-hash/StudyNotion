const {
  Schema,
  model,

} = require("mongoose");
const mongoose = require("mongoose")

const courseProgressSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completedVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSection"
  }]

});

const courseProgressModel = model("CourseProgress", courseProgressSchema)

module.exports = courseProgressModel