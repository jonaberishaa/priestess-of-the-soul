import nodemailer from 'nodemailer';

export function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export const STORE_EMAIL = 'jonaberishaa@gmail.com';
