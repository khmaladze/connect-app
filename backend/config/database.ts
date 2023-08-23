import mongoose from "mongoose";
import config from "./config";

// Connect to MongoDB database
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
