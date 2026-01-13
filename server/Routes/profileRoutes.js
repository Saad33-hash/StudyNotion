const express = require('express')
const router = express.Router()

const { auth } = require("../Middlewares/auth")
const { updateProfile, deleteProfile, updateProfilePicture, getAllUserDetails, getEnrolledCourses } = require("../Controllers/Profile")
const { updateCourseProgress, getCourseProgress, getEnrolledCoursesWithProgress } = require("../Controllers/CourseProgress")



router.put('/updateProfile', auth, updateProfile);
router.post('/updateProfilePicture', auth, updateProfilePicture)
router.delete('/deleteProfile/:id', auth, deleteProfile);
router.get('/getAllUserDetails', auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCoursesWithProgress);

// Course Progress Routes
router.post("/updateCourseProgress", auth, updateCourseProgress);
router.get("/getCourseProgress/:courseId", auth, getCourseProgress);

module.exports = router