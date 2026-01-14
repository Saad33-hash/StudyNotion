//afterreseting the passowrd then entry in made in db
const User = require("../Models/User");
const mailSent = require("../Utils/mailSent")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const passwordUpdated = require("../Mail/Templates/passwordUpdate")

//ressetpassowrdtoken -> authentication->generate a link and mail us. Through this link we can reset our passowrd
const resetPasswordToken = async (req, res) => {
    try {
        //gte email from requets ki body
        const email = req.body.email;
        //check whether user exist or not
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({
                success: true,
                message: "User does not exist"
            })
        }
        //gnerate toke -> we set the token and expiry time in the model of user
        const token = crypto.randomUUID();
        console.log("Here is the value i got from crypto", token);

        //creaete url->at whic we have to send the token
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const url = `${frontendUrl}/update-password/${token}`
        //update the user id database
        const updateUser = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordexpires: Date.now() + 5 * 60 * 1000
            },
            { new: true } //->will give us updated value
        )
        //send url on mail
        await mailSent.mailSender(email, "Reset Password Link", `Reset password Link:${url}`)
        //gnerate a response
        return res.status(200).json({

            success: true,
            message: "Passowrd Reset link has been sent successfully!",
            userInfo: updateUser
        })


    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something worng with reseting passowrd in resrtpassword function in controller"
        })

    }
}


const resetPassword = async (req, res) => {
    try {
        //fetch the data fom req ki body
        //validate the poassword entered by user
        //now hcekc whther user exist or not
        //check kro kay token expire honey ka time to nahi nikla gya
        //hashpasswod
        //update kr do database may->on the basis of token generated beacuse we dont knwo what the user is valid or not
        const { password, resetPassword, token } = req.body;
        if (password !== resetPassword) {
            return res.status(401).json({
                success: false,
                message: "Password does not match"
            })
        }

        const userDetails = await User.findOne({ token: token })
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User does not found!"
            })
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token expired!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Password Updated Successfully",
            data: updateUser
        })
    }
    catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something worng with reseting passowrd in resrtpassword function in controller"
        })
    }
}

module.exports = { resetPasswordToken, resetPassword }
//resetpassowrd->update password in our database
