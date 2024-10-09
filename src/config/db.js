import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

// Use the connection URI from environment variables
const uri = process.env.MONGO_URL

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process if the connection fails
  }
};

export default connectDB;
