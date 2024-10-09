// src/validation/authValidation.js
import { body, validationResult } from 'express-validator';

// Validation rules for user registration
export const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address.'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

// Validation rules for user login
export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address.'),

  body('password')
    .exists()
    .withMessage('Password is required.'),
];

// Middleware to check for validation errors
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
