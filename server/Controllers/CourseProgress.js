const CourseProgress = require("../Models/CourseProgress");
const Course = require("../Models/Course");
const SubSection = require("../Models/SubSection");

// Update course progress - add completed video
const updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!courseId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Please provide courseId and subSectionId",
            });
        }

        // Find or create progress document
        let progress = await CourseProgress.findOne({ courseId, userId });

        if (!progress) {
            // Create new progress document
            progress = await CourseProgress.create({
                courseId,
                userId,
                completedVideos: [subSectionId],
            });
        } else {
            // Check if already completed
            if (progress.completedVideos.includes(subSectionId)) {
                return res.status(200).json({
                    success: true,
                    message: "Video already marked as complete",
                    progress,
                });
            }

            // Add to completedVideos array
            progress.completedVideos.push(subSectionId);
            await progress.save();
        }

        return res.status(200).json({
            success: true,
            message: "Progress updated successfully",
            progress,
        });
    } catch (error) {
        console.log("Error in updateCourseProgress:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to update progress",
            error: error.message,
        });
    }
};

// Get course progress for a specific course
const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const progress = await CourseProgress.findOne({ courseId, userId });

        if (!progress) {
            return res.status(200).json({
                success: true,
                message: "No progress found",
                completedVideos: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Progress fetched successfully",
            completedVideos: progress.completedVideos,
        });
    } catch (error) {
        console.log("Error in getCourseProgress:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch progress",
            error: error.message,
        });
    }
};

// Get all enrolled courses with progress
const getEnrolledCoursesWithProgress = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's enrolled courses
        const User = require("../Models/User");
        const user = await User.findById(userId)
            .populate({
                path: "courses",
                populate: [
                    { path: "instructor", select: "firstName lastName" },
                    { path: "ratingAndReview" },
                    {
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        },
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

        // Get progress for each course
        const coursesWithProgress = await Promise.all(
            user.courses.map(async (course) => {
                // Get progress for this course
                const progress = await CourseProgress.findOne({
                    courseId: course._id,
                    userId,
                });

                // Calculate total lectures
                let totalLectures = 0;
                course.courseContent?.forEach((section) => {
                    totalLectures += section.subSection?.length || 0;
                });

                // Calculate progress percentage
                const completedCount = progress?.completedVideos?.length || 0;
                const progressPercentage =
                    totalLectures > 0
                        ? Math.round((completedCount / totalLectures) * 100)
                        : 0;

                return {
                    ...course.toObject(),
                    progressPercentage,
                    completedVideos: progress?.completedVideos || [],
                    totalLectures,
                };
            })
        );

        return res.status(200).json({
            success: true,
            message: "Enrolled courses with progress fetched successfully",
            data: coursesWithProgress,
        });
    } catch (error) {
        console.log("Error in getEnrolledCoursesWithProgress:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch enrolled courses",
            error: error.message,
        });
    }
};

module.exports = {
    updateCourseProgress,
    getCourseProgress,
    getEnrolledCoursesWithProgress,
};
