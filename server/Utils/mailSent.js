const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
    const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
    const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI || "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

    console.log("--- START GMAIL DEBUG ---");
    console.log("Available Env Keys:", Object.keys(process.env).filter(k => !k.includes("KEY") && !k.includes("PASS")).join(", "));
    console.log("GMAIL_CLIENT_ID present:", !!CLIENT_ID);
    console.log("GMAIL_CLIENT_SECRET present:", !!CLIENT_SECRET);
    console.log("GMAIL_REFRESH_TOKEN present:", !!REFRESH_TOKEN);
    console.log("--- END GMAIL DEBUG ---");

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      console.error("CRITICAL: Gmail API credentials missing.");
      throw new Error("Gmail API credentials (CI/CS/RT) missing from environment variables.");
    }

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'saadtkd786@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'StudyNotion <saadtkd786@gmail.com>',
      to: email,
      subject: title,
      html: body,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully via Gmail API:", result.messageId);
    return result;
  }
  catch (error) {
    console.error("Error occurred while sending mail via Gmail API:", error.message);
    throw error;
  }
}

module.exports = { mailSender }