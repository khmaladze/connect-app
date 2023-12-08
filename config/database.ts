import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

interface ExtendedConnectOptions extends ConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ExtendedConnectOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error}`);
  }
};
