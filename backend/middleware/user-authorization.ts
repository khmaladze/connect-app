import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model";
import userActiveModel, {
  UserActiveStatusEnum,
} from "../models/user-active-model";
import { custom_server_response } from "../function/server-response";
import {
  apiSuccessStatusMessage,
  userAuthorizationMessage,
} from "../function/server-route-messages";
import config from "../config/config";

export interface CustomRequest extends Request {
  user?: any;
  file?: any;
}

const isDateExpired = (dateString: any) => {
  const currentDate = new Date(); // Get current date and time
  const givenDate = new Date(dateString); // Convert the given date string to a Date object

  return givenDate < currentDate; // Compare the given date with the current date
};

const userAuthorization = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwtToken as string) as {
        id: string;
      };

      // Get user from the db
      const user = await User.findById(decoded.id).select("_id");

      if (!user) {
        return custom_server_response(
          res,
          401,
          apiSuccessStatusMessage.no_success,
          userAuthorizationMessage.user_not_found
        );
      }

      const userJwtStatus = await userActiveModel.findOne({
        jwt: token,
        user_id: user._id,
        status: UserActiveStatusEnum.Active,
      });

      if (!userJwtStatus) {
        return custom_server_response(
          res,
          401,
          apiSuccessStatusMessage.no_success,
          userAuthorizationMessage.session_not_found
        );
      }

      const userJwtStatusList = await userActiveModel.find({
        user_id: user._id,
      });

      for (var i = 0; i < userJwtStatusList.length; i++) {
        let isSessionDateExpired = isDateExpired(userJwtStatusList[i].expires);
        if (isSessionDateExpired) {
          await userActiveModel.findByIdAndRemove(userJwtStatusList[i]._id);
        }
      }

      const isExpired = isDateExpired(userJwtStatus.expires);

      if (isExpired) {
        return custom_server_response(
          res,
          401,
          apiSuccessStatusMessage.no_success,
          userAuthorizationMessage.session_expired
        );
      }

      req.user = user;
      next();
    } catch (error) {
      return custom_server_response(
        res,
        401,
        apiSuccessStatusMessage.no_success,
        userAuthorizationMessage.not_authorized
      );
    }
  }

  if (!token) {
    return custom_server_response(
      res,
      401,
      apiSuccessStatusMessage.no_success,
      userAuthorizationMessage.not_authorized_no_token
    );
  }
};

export default userAuthorization;
