const express = require("express")
const router = express.Router()
const { contactUsForm } = require("../Controllers/contactUs")

router.post("/contactUsForm", contactUsForm)

module.exports = router