const express = require("express")
const router = express.Router()
const { contactUsForm} = require("../Controllers/ContactUs")

router.post("/contactUsForm", contactUsForm)

module.exports = router