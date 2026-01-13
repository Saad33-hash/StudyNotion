const Course = require("../Models/Course");
const User = require("../Models/User");
const mongoose = require("mongoose");

// Enroll user in courses (called after payment)
const enrollStudents = async (req, res) => {
  try {
    const { courses } = req.body; // Array of course IDs
    const userId = req.user.id;

    // Validate input
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide courses to enroll",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const enrolledCourses = [];
    const errors = [];

    // Process each course
    for (const courseId of courses) {
      try {
        // Find the course
        const course = await Course.findById(courseId);

        if (!course) {
          errors.push({ courseId, message: "Course not found" });
          continue;
        }

        // Check if already enrolled
        const userObjectId = new mongoose.Types.ObjectId(userId);
        if (course.studentEnrolled.includes(userObjectId)) {
          errors.push({ courseId, message: "Already enrolled in this course" });
          continue;
        }

        // Add user to course's studentEnrolled array
        await Course.findByIdAndUpdate(
          courseId,
          {
            $push: { studentEnrolled: userId },
            $inc: { enrollmentCount: 1 },
          },
          { new: true }
        );

        // Add course to user's courses array
        await User.findByIdAndUpdate(
          userId,
          {
            $push: { courses: courseId },
          },
          { new: true }
        );

        enrolledCourses.push(courseId);
      } catch (error) {
        console.log(`Error enrolling in course ${courseId}:`, error.message);
        errors.push({ courseId, message: error.message });
      }
    }

    // Return response
    if (enrolledCourses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to enroll in any course",
        errors,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully enrolled in ${enrolledCourses.length} course(s)`,
      enrolledCourses,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.log("Error in enrollStudents controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while enrolling",
      error: error.message,
    });
  }
};

// Get user's enrolled courses (with full details)
const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({
        path: "courses",
        populate: [
          {
            path: "instructor",
            select: "firstName lastName",
          },
          {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
          {
            path: "ratingAndReview",
          },
        ],
      })
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      courses: user.courses,
    });
  } catch (error) {
    console.log("Error in getEnrolledCourses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
};

const unenrollStudent = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Please provide course ID",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if user is enrolled
    const userObjectId = new mongoose.Types.ObjectId(userId);
    if (!course.studentEnrolled.includes(userObjectId)) {
      return res.status(400).json({
        success: false,
        message: "User is not enrolled in this course",
      });
    }

    // Remove user from course's studentEnrolled array
    await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { studentEnrolled: userId },
        $inc: { enrollmentCount: -1 },
      },
      { new: true }
    );

    // Remove course from user's courses array
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { courses: courseId },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully unenrolled from course",
      courseId,
    });
  } catch (error) {
    console.log("Error in unenrollStudent:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to unenroll from course",
      error: error.message,
    });
  }
};

module.exports = { enrollStudents, getEnrolledCourses,unenrollStudent };