const Course = require("../Models/Course");
const User = require("../Models/User");
const Category = require("../Models/Category");
const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const cloudinary = require("cloudinary").v2;

// Get all courses created by instructor
const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Find all courses by this instructor
    const courses = await Course.find({ instructor: instructorId })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Instructor courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.log("Error in getInstructorCourses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor courses",
      error: error.message,
    });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    // Find the course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Verify that the instructor owns this course
    if (course.instructor.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
    }

    // Remove course from enrolled students
    const enrolledStudents = course.studentEnrolled;
    for (const studentId of enrolledStudents) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Remove course from category
    if (course.category) {
      await Category.findByIdAndUpdate(course.category, {
        $pull: { course: courseId },
      });
    }

    // Delete all sections and subsections
    const sections = course.courseContent;
    for (const sectionId of sections) {
      const section = await Section.findById(sectionId);
      if (section) {
        // Delete all subsections in this section
        for (const subSectionId of section.subSection) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
        // Delete the section
        await Section.findByIdAndDelete(sectionId);
      }
    }

    // Remove course from instructor's courses array
    await User.findByIdAndUpdate(instructorId, {
      $pull: { courses: courseId },
    });

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteCourse:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

// Update course status (Draft/Published)
const updateCourseStatus = async (req, res) => {
  try {
    const { courseId, status } = req.body;
    const instructorId = req.user.id;

    // Validate status
    if (!["Draft", "Published"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Draft' or 'Published'",
      });
    }

    // Find and verify course ownership
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
    }

    // Update status
    course.status = status;
    await course.save();

    return res.status(200).json({
      success: true,
      message: `Course status updated to ${status}`,
      course,
    });
  } catch (error) {
    console.log("Error in updateCourseStatus:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update course status",
      error: error.message,
    });
  }
};

module.exports = { getInstructorCourses, deleteCourse, updateCourseStatus };