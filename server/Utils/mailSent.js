const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const mailSender = async (email, title, body) => {
  try {
    // Using gmail service to handle authentication automatically
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      logger: true,
      debug: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("Transporter initialized with user:", process.env.MAIL_USER ? process.env.MAIL_USER.substring(0, 4) + "..." : "undefined");
    console.log("Password length:", process.env.MAIL_PASS ? process.env.MAIL_PASS.length : 0);

    // Wrap in an async IIFE so we can use await.

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`, // HTML body
    });

    console.log("Message sent:", info.messageId);
    return info;
  }
  catch (error) {
    console.log("error coming from nodemialer in utils", error)
    throw error;
  }
}

module.exports = { mailSender }