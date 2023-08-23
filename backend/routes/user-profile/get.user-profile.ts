import { Response } from "express";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  userProfileMessage,
} from "../../function/server-route-messages";
import { UserProfile } from "../../models/user-profile-model";
import { CustomRequest } from "../../middleware/user-authorization";

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userProfileMessage.user_required
      );
    }

    const userData = await UserProfile.findOne({
      user_profile_id: userProfileId,
    });

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userProfileMessage.userprofile_data_success,
      userData
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
