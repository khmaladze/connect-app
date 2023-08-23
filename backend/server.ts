import express, { Application, Request } from "express";
import bodyParser from "body-parser";
import { detailMessage, isValidEnv } from "./validate/validate";
import { connectDB } from "./config/database";
import config from "./config/config";
import authRoutes from "./routes/auth/index";
import userProfileRoutes from "./routes/user-profile/index";
import userSettingsRoutes from "./routes/settings/index";
import { v2 as cloudinary } from "cloudinary";

// Check if environment variables are provided
if (isValidEnv()) {
  // Connect to the database
  connectDB();

  // Initialize the app
  const app: Application = express();

  // Set up Cloudinary configuration
  const { cloudName, apiKey, apiSecret } = config.cloudinary;
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  // Parse incoming request bodies in a middleware before your handlers
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const userRoute = config.backend_api.user;

  // Define routes
  app.use(userRoute.user_auth.path, authRoutes);
  app.use(userRoute.user_profile.path, userProfileRoutes);
  app.use(userRoute.user_settings.path, userSettingsRoutes);

  // Start the server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
} else {
  // Configuration validation failed, display error message
  detailMessage();
  process.exit(1);
}
