import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import {
  userGetFriendRequestMessage,
  userSendFriendRequestMessage,
} from "../../../function/server-route-messages";
import { CustomRequest } from "../../../middleware/user-authorization";

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        userSendFriendRequestMessage.user_required
      );
    }

    const userFriendRequest = await UserFriendAdd.find({
      receiver: userProfileId,
      status: "pending",
    });

    return custom_server_response(
      res,
      200,
      userGetFriendRequestMessage.get_friend_request_success,
      userFriendRequest
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
