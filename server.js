import dotenv from 'dotenv';
dotenv.config();

import { listen } from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};


// Start the server
startServer();
