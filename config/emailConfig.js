import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.SERVICE_HOST,
  port: process.env.SMTP_PORT,
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter;
