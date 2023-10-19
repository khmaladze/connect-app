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
import config from "../../../config/config";

export interface CustomRequest extends Request {
  user?: any;
  file?: any;
}

const isDateExpired = (dateString: any) => {
  const currentDate = new Date();
  const givenDate = new Date(dateString);
  return givenDate < currentDate;
};

const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt_token as string) as { id: string };
};

const removeExpiredSessions = async (userJwtStatusList: any[]) => {
  for (const session of userJwtStatusList) {
    if (isDateExpired(session.expires)) {
      await userActiveModel.findByIdAndRemove(session._id);
    }
  }
};

const userAuthorization = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
      const token = authorizationHeader.split(" ")[1];
      const decoded = verifyToken(token);
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

      removeExpiredSessions(userJwtStatusList);

      if (isDateExpired(userJwtStatus.expires)) {
        return custom_server_response(
          res,
          401,
          apiSuccessStatusMessage.no_success,
          userAuthorizationMessage.session_expired
        );
      }

      req.user = user;
      next();
    } else {
      return custom_server_response(
        res,
        401,
        apiSuccessStatusMessage.no_success,
        userAuthorizationMessage.not_authorized
      );
    }
  } catch (error) {
    return custom_server_response(
      res,
      401,
      apiSuccessStatusMessage.no_success,
      userAuthorizationMessage.not_authorized
    );
  }
};

export default userAuthorization;