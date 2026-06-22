import nodemailer from "nodemailer";
import dns from "dns";
import "dotenv/config";

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

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

  lookup,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
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