const { google } = require('googleapis');

const mailSender = async (email, title, body) => {
  try {
    const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
    const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
    const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI || "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

    // Basic presence check
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      throw new Error("Gmail API credentials missing from environment variables.");
    }

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Create the raw email message (MIME format using CRLF \r\n)
    const utf8Subject = `=?utf-8?B?${Buffer.from(title).toString('base64')}?=`;
    const messageParts = [
      'From: StudyNotion <saadtkd786@gmail.com>',
      `To: ${email}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      body,
    ];
    const message = messageParts.join('\r\n');

    // The Gmail API requires the message to be base64url encoded
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("Email sent successfully via Pure Gmail REST API:", res.data.id);
    return res.data;
  }
  catch (error) {
    console.error("Error occurred while sending mail via Gmail REST API:", error.message);
    throw error;
  }
}

module.exports = { mailSender }