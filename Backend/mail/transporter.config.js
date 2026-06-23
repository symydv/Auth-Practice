import nodemailer from "nodemailer";
import "dotenv/config";

console.log("BREVO FILE EXECUTED");

console.log("BREVO_USER:", process.env.BREVO_USER ? "exists" : "missing");
console.log("BREVO_PASS:", process.env.BREVO_PASS ? "exists" : "missing");

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.BREVO_USER.trim(),
    pass: process.env.BREVO_PASS.trim(),
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

console.log("Before verify");

transporter.verify((err) => {
  console.log("Verify callback executed");

  if (err) {
    console.log("Brevo error:", err);
  } else {
    console.log("Brevo SMTP ready");
  }
});