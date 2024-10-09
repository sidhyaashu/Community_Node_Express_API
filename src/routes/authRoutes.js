// authRoutes.js
import express from 'express';
import { registerValidation, loginValidation, validateRequest } from '../validations/authValidation.js';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);

export default router;
