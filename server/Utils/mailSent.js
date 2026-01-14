const SibApiV3Sdk = require('@getbrevo/brevo');

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.error("CRITICAL: BREVO_API_KEY is missing from environment variables");
      throw new Error("BREVO_API_KEY is missing");
    }

    console.log("Initializing Brevo API with key starting with:", process.env.BREVO_API_KEY.substring(0, 5) + "...");

    // Initialize Brevo
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    console.log("Sending email via Brevo to:", email);

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = title;
    sendSmtpEmail.htmlContent = body;
    // Updated name to match your Brevo Dashboard exactly
    sendSmtpEmail.sender = { name: "My Company", email: "saadtkd786@gmail.com" };
    sendSmtpEmail.to = [{ email: email }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent successfully via Brevo:", data.messageId);
    return data;
  }
  catch (error) {
    // Log more details if available (Brevo errors often have a response body)
    if (error.response && error.response.body) {
      console.error("Brevo API Error Detail:", JSON.stringify(error.response.body));
    }
    console.error("Error occurred while sending mail via Brevo:", error.message);
    throw error;
  }
}

module.exports = { mailSender }