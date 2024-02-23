import express, { Application } from "express";
import bodyParser from "body-parser";
import { detailMessage, isValidEnv } from "./validate/validate";
import { connectDB } from "../../config/database";
import config from "../../config/config";
import authRoutes from "./routes/auth/index";
import userProfileRoutes from "./routes/profile/index";
import userSettingsRoutes from "./routes/settings/index";
import userFriendsRoutes from "./routes/friend/index";
import userPostsRoutes from "./routes/post/index";
import userStorysRoutes from "./routes/story/index";
import userMessageRoutes from "./routes/message/index";
import userFriendProfileRoutes from "./routes/userprofile/index";
import { v2 as cloudinary } from "cloudinary";
import swaggerSpec from "./swagger";
import swaggerUi from "swagger-ui-express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import path from "path";

// Check if environment variables are provided
if (isValidEnv()) {
  console.log("start");
  // Connect to the database
  connectDB();

  // Initialize the app
  const app: Application = express();

  app.use(mongoSanitize());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 300, // limit each IP to 100 requests per windowMs
    })
  );
  app.use(helmet());
  // Set Content Security Policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      },
    })
  );
  app.use(hpp());

  // Set up Cloudinary configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  // Parse incoming request bodies in a middleware before your handlers
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const configApiUser: string = "/api/user"; // Use camelCase for variable names

  // Define routes
  app.use(`${configApiUser}/auth`, authRoutes);
  app.use(`${configApiUser}/profile`, userProfileRoutes);
  app.use(`${configApiUser}/post`, userPostsRoutes);
  app.use(`${configApiUser}/story`, userStorysRoutes);
  app.use(`${configApiUser}/friend`, userFriendsRoutes);
  app.use(`${configApiUser}/settings`, userSettingsRoutes);
  app.use(`${configApiUser}/message`, userMessageRoutes);
  app.use(`${configApiUser}/userprofile`, userFriendProfileRoutes);

  // Serve API documentation only in development environment
  if (config.node_env === "development") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../../frontend/build")));

    app.get("*", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "../../../frontend/build", "index.html")
      )
    );
  }

  // Start the server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
} else {
  // Configuration validation failed, display error message
  detailMessage();
  process.exit(1);
}
