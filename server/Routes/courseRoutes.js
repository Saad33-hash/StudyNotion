const express = require('express')
const router = express.Router()

const {createCourse,showAllData,getAllCourseDetails,getASpecificCourse}=require("../Controllers/course");
const {createCategory,getAllCategory,getCategoryPageDetails}=require("../Controllers/Category");
const {createRating,getAverageRating,getAllCourseSpecificReviews,getAllReview}=require("../Controllers/RatingAndReview");
const { auth, isInstructor, isStudent, isAdmin } = require("../Middlewares/auth")
const { enrollStudents, getEnrolledCourses , unenrollStudent} = require("../Controllers/Enrollment");
const { createPayment, getPurchaseHistory, getPaymentDetails } = require("../Controllers/Payment");
const { getInstructorCourses, deleteCourse, updateCourseStatus } = require("../Controllers/InstructorCourse");


//course routes
router.post('/createCourse',auth,isInstructor,createCourse);
router.get('/getAllData',showAllData)
//router.get('/getAllCourseDetails',auth,getAllCourseDetails);
router.get('/getCourseDetails/:courseId', getAllCourseDetails);
router.get('/getASpecificCourse',getASpecificCourse);
//router.get('/getASpecificCourse/:courseId', getASpecificCourse);

//Instructor route
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses);
router.delete('/deleteCourse/:courseId', auth, isInstructor, deleteCourse);
router.put('/updateCourseStatus', auth, isInstructor, updateCourseStatus);



//category routes
router.post('/createCategory',auth, isAdmin,createCategory);
router.get('/getAllCategory',getAllCategory)
router.get('/getCategoryPageDetails/:categoryId', getCategoryPageDetails);



//create Rating
router.post('/createRating',auth, isStudent,createRating);
router.get('/getAverageRating',getAverageRating);
router.get('/getAllCourseSpecificReviews',getAllCourseSpecificReviews)
router.get('/getAllReview',getAllReview);

router.post('/enrollStudents', auth, isStudent, enrollStudents);
router.get('/getEnrolledCourses', auth, isStudent, getEnrolledCourses);
router.post('/unenrollStudent', auth, isStudent, unenrollStudent);

//purchase history routes
router.post('/createPayment', auth, isStudent, createPayment);
router.get('/getPurchaseHistory', auth, isStudent, getPurchaseHistory);
router.get('/getPaymentDetails/:orderId', auth, isStudent, getPaymentDetails);
module.exports = router