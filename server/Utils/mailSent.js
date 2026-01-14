const SibApiV3Sdk = require('@getbrevo/brevo');

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is missing from environment variables");
    }

    // Initialize Brevo within the function
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    console.log("Sending email via Brevo to:", email);

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = title;
    sendSmtpEmail.htmlContent = body;
    sendSmtpEmail.sender = { name: "StudyNotion", email: "saadtkd786@gmail.com" };
    sendSmtpEmail.to = [{ email: email }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent successfully via Brevo:", data.messageId);
    return data;
  }
  catch (error) {
    console.log("Error occurred while sending mail via Brevo:", error.message);
    throw error;
  }
}

module.exports = { mailSender }