// const twilio = require("twilio");

// // Load credentials from environment variables
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromPhone = process.env.TWILIO_PHONE;

// const client = twilio(accountSid, authToken);

// /**
//  * Sends an SMS to a given phone number with the provided message body.
//  * 
//  * @param {string} to - The recipient's phone number (e.g., '+919876543210').
//  * @param {string} body - The message to send.
//  * @returns {Promise} - Twilio message response.
//  */
// exports.sendSms = (to, body) => {
//   return client.messages.create({
//     body: body,
//     from: fromPhone,
//     to: to,
//   });
// };
// utils/smsSender.js
const axios = require('axios');

const API_KEY = process.env.FAST2SMS_API_KEY;

exports.sendSms = async (to, message) => {
  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'v3',
      sender_id: 'TXTIND',
      message: message,
      language: 'english',
      numbers: to,
    }, {
      headers: {
        'authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log(`SMS sent to ${to}:`, response.data);
  } catch (error) {
    console.error(`Failed to send SMS to ${to}:`, error.response ? error.response.data : error.message);
  }
};
