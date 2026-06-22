import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log("Mail error:", err);
  } else {
    console.log("Mail server ready");
  }
});