import rateLimit from 'express-rate-limit'; // Middleware for rate limiting

// Rate limiting middleware
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.', // Custom message
});
