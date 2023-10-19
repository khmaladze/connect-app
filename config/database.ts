import mongoose from "mongoose";
import config from "./config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error}`);
  }
};
