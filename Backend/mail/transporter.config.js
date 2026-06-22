import nodemailer from "nodemailer"
import "dotenv/config";
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  family: 4, // force IPv4
});

transporter.verify((err) => {

    if(err){
        console.log("Mail error:", err);
    }
    else{
        console.log("Mail server ready");
    }
});