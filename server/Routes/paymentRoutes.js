const express = require('express')
const router = express.Router()
const {auth,isStudent}=require('../Middlewares/auth')
const {capturePayment,verifySignature}=require('../Controllers/Payments')
router.post('/capturePayment',auth,isStudent,capturePayment)
router.post('/vaerifyPayment',auth,isStudent,verifySignature)






module.exports = router