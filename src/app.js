import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"; // Middleware for securing HTTP headers
import { limiter } from "./middlewares/rateLimiter.js"; // Middleware for rate limiting
import { errorHandler } from "./middlewares/errorHandler.js"; // Error handler middleware
import authRoutes from "./routes/authRoutes.js";
import { errorLogger } from "./middlewares/errorLogger.js"; // Assuming you have this middleware
import { performanceMonitor } from "./middlewares/performanceMonitor.js"; // Assuming you have this middleware
import { requestLogger } from "./middlewares/requestLogger.js"
import userRoutes from "./routes/userRoutes.js"
import profileRoute from "./routes/profileRoutes.js"



const app = express();

// Middleware
app.use(helmet()); // Use Helmet to set secure HTTP headers
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors()); // Enable CORS for all routes
app.use(morgan("tiny")); // HTTP request logger
// app.use(requestLogger); // Custom logging for additional details

app.use(performanceMonitor); // Performance monitoring middleware

app.use(limiter); // Apply rate limiting to all requests

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoute);


app.use(errorLogger); // Error logging middleware , Use it before your error handler 
app.use(errorHandler); // Error handling middleware

export const listen = (port, callback) => {
  app.listen(port, callback);
};