import { Request, Response, NextFunction } from "express";
import { custom_server_response } from "../function/server-response";
import { userCheckMessage } from "../function/server-route-messages";
import { CustomRequest } from "./user-authorization";

const userCheck = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(res, 400, userCheckMessage.user_required);
    }

    next();
  } catch (error) {
    return custom_server_response(res, 401, userCheckMessage.not_authorized);
  }
};

export default userCheck;
