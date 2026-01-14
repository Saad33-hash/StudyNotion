const { Resend } = require('resend');

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    console.log("Sending email via Resend to:", email);

    const { data, error } = await resend.emails.send({
      from: 'StudyNotion <onboarding@resend.dev>', // Default Resend testing email
      to: email,
      subject: title,
      html: body,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully via Resend:", data.id);
    return data;
  }
  catch (error) {
    console.log("Error occurred while sending mail via Resend:", error.message);
    throw error;
  }
}

module.exports = { mailSender }