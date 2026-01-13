const express = require('express')
const router = express.Router()
const {sendOTP,signUp,logIn,changePassword}=require("../Controllers/Auth");
const { resetPassword,resetPasswordToken } = require('../Controllers/ResetPassowrd');
const { auth} = require("../Middlewares/auth")



//post routes
router.post('/signUp',signUp)
router.post('/login',logIn)
router.post('/sendOTP',sendOTP)
router.post('/changePassword',auth,changePassword);


//resetpassowrd
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword)




module.exports = router
