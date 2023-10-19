import express, { Application, Request } from "express";
import bodyParser from "body-parser";
import { detailMessage, isValidEnv } from "./validate/validate";
import { connectDB } from "../../config/database";
import config from "../../config/config";
import authRoutes from "./routes/auth/index";
import userProfileRoutes from "./routes/profile/index";
import userSettingsRoutes from "./routes/settings/index";
import { v2 as cloudinary } from "cloudinary";
import swaggerSpec from "./swagger";
import swaggerUi from "swagger-ui-express";

// Check if environment variables are provided
if (isValidEnv()) {
  // Connect to the database
  connectDB();

  // Initialize the app
  const app: Application = express();

  // Set up Cloudinary configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  // Parse incoming request bodies in a middleware before your handlers
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const config_api_user: string = "/api/user";

  // Define routes
  app.use(`${config_api_user}/auth`, authRoutes);
  app.use(`${config_api_user}/profile`, userProfileRoutes);
  app.use(`${config_api_user}/settings`, userSettingsRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Start the server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
} else {
  // Configuration validation failed, display error message
  detailMessage();
  process.exit(1);
}
