// userRoutes.js
import express from 'express';
import { requestPasswordChange, changePassword } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; // Adjust the path as necessary

const router = express.Router();

// Route to request password change (send verification code)
router.post('/request-password-change', authMiddleware, requestPasswordChange);

// Route to change password (verify code and update password)
router.post('/change-password', authMiddleware, changePassword);

export default router;
