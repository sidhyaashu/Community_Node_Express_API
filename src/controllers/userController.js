// userController.js
import User from '../models/userModel.js';
import { sendVerificationCode } from '../utils/emailService.js';
import crypto from 'crypto-js';
import bcrypt from 'bcryptjs';

// A simple in-memory store for verification codes (use a DB for production)
const verificationCodes = {};

// Request to change password (send verification code)
export const requestPasswordChange = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the logged-in user's email matches the provided email
    if (req.user.email !== email) {
      return res.status(403).json({ message: 'Unauthorized: You can only request a password change for your own account' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a verification code
    const verificationCode = crypto.randomBytes(3).toString('hex'); // A 6-character hex code

    // Store the code temporarily
    verificationCodes[email] = verificationCode;

    // Send the verification code via email
    await sendVerificationCode(email, verificationCode);

    res.status(200).json({ message: 'Verification code sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending verification code.' });
  }
};

// Verify the code and change password
export const changePassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    // Check if the logged-in user's email matches the provided email
    if (req.user.email !== email) {
      return res.status(403).json({ message: 'Unauthorized: You can only change the password for your own account' });
    }

    // Verify if the provided code matches the stored code
    if (verificationCodes[email] !== verificationCode) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Remove the verification code from memory
    delete verificationCodes[email];

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password.' });
  }
};
