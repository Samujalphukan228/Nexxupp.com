import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // TLS not enforced
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // <--- ignore self-signed certs
  },
});
