// authMiddleware.js
import jwt from 'jsonwebtoken';

// Cache the secret to avoid repeated reads
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(403).json({ message: 'Token missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // Attach user data from token to request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
