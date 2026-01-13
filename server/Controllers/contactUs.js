//const User=require("../Models/User");
const { mailSender } = require("../Utils/mailSent");
const contactUsEmail = require("../Mail/Templates/contactUsEmail")

//what will be in conyact us handler 
//as the suer click send mesage I want to send an amil to the user that you have sumbmitted a reponse on code help
//second we want to send the user data to our website
//will be designing email by myself

//will be getting the firstName,lastName,emailaddress,phone number and message in the req ki body
//the validatation kr lo ga
//the send email to codehelp uisng the studeent dump
//send email to student
//generate a reponse in which I will be sending teh emails


const contactUsForm = async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, phoneNumber, message } = req.body;
        console.log("here is the firstName", firstName);
        console.log("here is the lastName", lastName);
        console.log("here is the emailAddress", emailAddress);
        console.log("here is the contact us", phoneNumber);
        console.log("here is the message", message);
        if (!firstName || !lastName || !emailAddress || !phoneNumber || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all the information!"
            })
        }
        const sendEmailToStudent = await mailSender(emailAddress, "Response Submiited to studyNotion Team", contactUsEmail(firstName, lastName, emailAddress, phoneNumber, message));

        const sendEmailToStudyNotion = await mailSender("saadtkd786@gmail.com", `Reponse submitted by the user ${firstName} `, contactUsEmail(firstName, lastName, emailAddress, phoneNumber, message));

        ///generating a reponse
        return res.status(200).json({
            success: true,
            message: "Email send to the user and the studynotion team successfully!",
            userEmail: sendEmailToStudent,
            teamEmail: sendEmailToStudyNotion
        })
    }
    catch (error) {
        console.log("Error in the ctahc block of contact us Form", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = { contactUsForm }
