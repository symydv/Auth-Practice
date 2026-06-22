import nodemailer from "nodemailer";
import dns from "dns";
import "dotenv/config";

const lookup = (hostname, options, callback) => {
  return dns.lookup(hostname, { family: 4 }, callback);
};

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // force IPv4 by using an IPv4-only DNS lookup
  lookup,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log("Mail error:", err);
  } else {
    console.log("Mail server ready");
  }
});