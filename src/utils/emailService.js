// mailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

export const sendVerificationCode = (email, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Change Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  return transporter.sendMail(mailOptions);
};
