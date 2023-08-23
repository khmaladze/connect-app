import { Response } from "express";
import userActiveModel, {
  UserActiveStatusEnum,
} from "../../models/user-active-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import { CustomRequest } from "../../middleware/user-authorization";
import {
  apiSuccessStatusMessage,
  userLogOutMessage,
} from "../../function/server-route-messages";

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    let token: any = "";

    // Get token from header
    token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    await userActiveModel.findOneAndUpdate(
      {
        jwt: token,
        user_id: req.user._id,
      },
      { status: UserActiveStatusEnum.LogOut },
      { new: true }
    );

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userLogOutMessage.user_log_out_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
