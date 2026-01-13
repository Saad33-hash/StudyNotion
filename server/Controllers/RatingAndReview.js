//user can only ad review when hes login so ill be requiring user model
//review will be among the course so I need course modle
const User = require("../Models/User");
const Course = require("../Models/Course");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const RatingAndReview = require("../Models/RatingAndReview")



//creating a review
//name image we are already getting because user is login
//we just be needing add your experince from request body
//user id will be get from req.body beacuse user is already login
//rating will be for a course user is alreaddy enrolled so we need course id too and check whther user enrolled in that course or not
//I will cretae a review 
//gnerate a reponse
const createRating = async (req, res) => {
    try {
        const { rating, reviews, courseId } = req.body;
        if (!rating || !reviews || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all the information!"
            })
        }
        const validCourse = await Course.findById(courseId);
        if (!validCourse) {
            return res.status(400).json({
                success: false,
                messgae: "Course does not found!"
            })
        }

        const userID = req.user.id;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User with such id does not found!"
            })
        }


        //database intercation so I ahve to use try catch block
        //first I have to conver user id into an object and then ill check with Course.studentenrolled.includes(user) then cannot add a review else add one
        //const userIDConversion=new mongoose.Types.ObjectId(userID);
        const userIDConversion = new mongoose.mongo.ObjectId(userID);
        console.log("here is the userIdconversion", userIDConversion)
        if (!validCourse.studentEnrolled.includes(userIDConversion)) {
            return res.status(400).json({
                success: false,
                message: "You cannot add a review"
            })
        }
        //now I wnat to check that if user alreadu submit a reponse he cannaot add another one
        const checkReviewSubmission = await RatingAndReview.findOne({
            user: userID,
            course: courseId
        });
        if (checkReviewSubmission) {
            return res.status(403).json({
                success: false,
                message: "Response already submitted. Cant submit a reponse again!"
            })
        }

        const addingAReview = await RatingAndReview.create({
            //we have to insert things that exists in database
            user: userID,
            course: courseId,
            rating: rating,
            reviews: reviews
        }
        )

        //pushing the review object to course refernce
        const addRefernceToCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReview: addingAReview._id,
                }
            },
            { new: true }
        )
        console.log(addRefernceToCourse);
        return res.status(200).json({
            success: true,
            message: "Review successfully created!",
            data: addingAReview
        })
    }
    catch (error) {
        console.log("Error in catch block of create Review:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }

}

const getAverageRating = async (req, res) => {
    //get coure id 
    //fetch review details and then try to find rtaing usr the course id
    //egt average rating
    //if no rtaing show no rating yes else show the avergae

    try {
        const courseID = req.body.courseId;
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Course ID not found!"
            })
        }

        //in rating and review collection I will use aggregiate function
        //do and match the course id in that collection
        //then group but on what basis we dont know. When we dobt know we will have to use null
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ])

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating

            })
        }

        //if no rating exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0,no rtaing is given now!",
            averageRating: 0,
        })


    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const getAllCourseSpecificReviews = async (req, res) => {
    try {

        //will get the review according to the for a single course all reviews should be shown
        const { courseID } = req.body;
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Course ID can not found"
            })
        }
        const reviews = await RatingAndReview.find({ course: courseID })
            .populate({
                path: "ratingAndReview", // populate reviews
                populate: {
                    path: "user", // inside each review, populate the user
                    select: "firstName lastName email", // only pick required fields
                },
            });

        if (!reviews || !reviews.RatingAndReview.length == 0) {
            return res.status(200).json({
                success: true,
                message: "No reviews for this course yet",
                reviews: []
            });
        }
        return res.status(200).json({
            success: true,
            message: "Review details fetched correctly",
            reviews
        })
    }
    catch (error) {
        console.log("error in cathc block of getAllreview ", error.message)
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }


}

//get all reviews
const getAllReview = async (req, res) => {
    //get all data based on no cretieria
    //user sort in descedning beacuse we dont want 1 star reviw first and select which things you wnat to display
    try {
        const allReviews = await RatingAndReview.find({}).populate({
            path: "user",
            select: "firstName lastName email image "
        }).populate({
            path: "course",
            select: "courseName"
        }).exec();

        return res.status(200).json({
            success: true,
            message: "All course reviews fetched successfully!",
            data: allReviews
        })
    }
    catch (error) {
        console.log("error in the ctahc block of getAll reviews", error.message)
        return res.status(500).json({

            success: false,
            message: "All course data cannot be fetched!"
        })
    }
}

module.exports = { createRating, getAverageRating, getAllCourseSpecificReviews, getAllReview }