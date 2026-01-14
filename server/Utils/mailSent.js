const SibApiV3Sdk = require('@getbrevo/brevo');

// Initialize Brevo with API Key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const mailSender = async (email, title, body) => {
  try {
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