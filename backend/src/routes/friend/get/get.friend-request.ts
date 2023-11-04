import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import {
  userGetFriendRequestMessage,
  userSendFriendRequestMessage,
} from "../../../function/server-route-messages";
import { CustomRequest } from "../../../middleware/user-authorization";
import { User } from "../../../models/user/user-model";

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

    if (userFriendRequest.length < 1) {
      return custom_server_response(
        res,
        200,
        userGetFriendRequestMessage.get_friend_request_success,
        userFriendRequest
      );
    }

    const userDetails = await User.find({
      _id: userFriendRequest[0].sender,
    }).select("_id profileImage gender username");

    return custom_server_response(
      res,
      200,
      userGetFriendRequestMessage.get_friend_request_success,
      userDetails
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
