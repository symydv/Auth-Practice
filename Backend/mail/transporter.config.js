import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.BREVO_USER.trim(),
    pass: process.env.BREVO_PASS.trim(),
  },
});


transporter.verify((err) => {
  if (err) {
    console.log("Brevo error:", err);
  } else {
    console.log("Brevo SMTP ready");
  }
});