import { Response } from "express";
import userActiveModel from "../../models/user-active-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import { CustomRequest } from "../../middleware/user-authorization";
import {
  apiSuccessStatusMessage,
  userSettingsUserActiveMessage,
} from "../../function/server-route-messages";

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userActiveData = await userActiveModel
      .find({
        user_id: req.user._id,
      })
      .sort("-createdAt")
      .select("-jwt");

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userSettingsUserActiveMessage.get_user_log_success,
      userActiveData
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
