import axios from "axios";
import "dotenv/config";

export const sendEmail = async (to, subject, html) => {
  try {
    console.log("Sending email to:", to);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Auth Team",
          email: process.env.SENDER_EMAIL,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,
        htmlContent: html,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("Email sent:", response.data);

    return response.data;

  } catch (error) {

    console.log("BREVO SEND ERROR:");

    console.log(
      error.response?.data || error.message
    );

    throw error;
  }
};