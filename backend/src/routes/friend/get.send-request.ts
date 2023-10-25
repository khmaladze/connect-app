import { Response } from "express";
import { UserFriendAdd } from "../../models/friend/friend-send-request-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  getFriendSendRequestMessage,
  userGetFriendRequestMessage,
} from "../../function/server-route-messages";
import { CustomRequest } from "../../middleware/user-authorization";

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        getFriendSendRequestMessage.user_required
      );
    }

    const userFriendRequest = await UserFriendAdd.find({
      sender: userProfileId,
      status: "pending",
    });

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userGetFriendRequestMessage.get_friend_request_success,
      userFriendRequest
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
