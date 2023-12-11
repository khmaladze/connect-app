// Import necessary modules and types
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user/user-model";
import userActiveModel, {
  UserActiveStatusEnum,
} from "../models/user/user-active-model";
import { custom_server_response } from "../function/server-response";
import config from "../../../config/config";

// Define custom request interface extending Express request
export interface CustomRequest extends Request {
  user?: any;
  file?: any;
}

// Define messages for user authorization
const userAuthorizationMessage = {
  userNotFound: "Error, You are not a user. User not found",
  sessionNotFound: "Session not found",
  sessionExpired: "Session expired",
  notAuthorized: "Not authorized",
  notAuthorizedNoToken: "Not authorized, no token",
  userRequired: "User required",
};

// Function to check if a date is expired
const isDateExpired = (dateString: string): boolean => {
  const currentDate = new Date();
  const givenDate = new Date(dateString);
  return givenDate < currentDate;
};

// Function to verify JWT token
const verifyToken = (token: string): { id: string } => {
  return jwt.verify(token, config.jwt_token as string) as { id: string };
};

// Function to remove expired user sessions
const removeExpiredSessions = async (
  userJwtStatusList: any[]
): Promise<void> => {
  for (const session of userJwtStatusList) {
    if (isDateExpired(session.expires)) {
      await userActiveModel.findByIdAndRemove(session._id);
    }
  }
};

// Function to validate user session
const validateUserSession = async (
  token: string,
  user: any,
  res: Response
): Promise<boolean> => {
  const userJwtStatus = await userActiveModel.findOne({
    jwt: token,
    user_id: user._id,
    status: UserActiveStatusEnum.Active,
  });

  if (!userJwtStatus) {
    custom_server_response(res, 401, userAuthorizationMessage.sessionNotFound);
    return false;
  }

  const userJwtStatusList = await userActiveModel.find({
    user_id: user._id,
  });

  await removeExpiredSessions(userJwtStatusList);

  if (isDateExpired(userJwtStatus.expires)) {
    custom_server_response(res, 401, userAuthorizationMessage.sessionExpired);
    return false;
  }

  return true;
};

// Function to validate user profile ID
const validateUserProfileId = (user: any, res: Response): boolean => {
  const userProfileId: number = user._id;

  if (!userProfileId) {
    custom_server_response(res, 400, userAuthorizationMessage.userRequired);
    return false;
  }

  return true;
};

// Middleware for user authorization
const userAuthorization = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get authorization header from the request
    const authorizationHeader = req.headers.authorization;

    // Check if the header exists and starts with "Bearer"
    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
      // Extract the token from the header
      const token = authorizationHeader.split(" ")[1];
      const decoded = verifyToken(token);

      // Find the user based on the decoded token
      const user = await User.findById(decoded.id).select("_id");

      // If user not found, return an error response
      if (!user) {
        custom_server_response(res, 401, userAuthorizationMessage.userNotFound);
        return;
      }

      // Validate user session and user profile ID
      if (!(await validateUserSession(token, user, res))) {
        return;
      }

      if (!validateUserProfileId(user, res)) {
        return;
      }

      // Set the user in the request object and proceed to the next middleware
      req.user = user;

      // Check req.user
      if (!validateUserProfileId(req.user, res)) {
        return;
      }

      next();
    } else {
      // If no valid authorization header is present, return an error response
      custom_server_response(res, 401, userAuthorizationMessage.notAuthorized);
    }
  } catch (error) {
    // Catch any unexpected errors and return an error response
    custom_server_response(res, 401, userAuthorizationMessage.notAuthorized);
  }
};

// Export the user authorization middleware
export default userAuthorization;
