import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import {
  getFriendSendRequestMessage,
  userGetFriendRequestMessage,
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
        getFriendSendRequestMessage.user_required
      );
    }

    const userFriendRequest = await UserFriendAdd.find({
      sender: userProfileId,
      status: "pending",
    }).select("_id sender receiver");

    if (userFriendRequest.length < 1) {
      return custom_server_response(
        res,
        200,
        getFriendSendRequestMessage.you_have_not_send_request,
        userFriendRequest
      );
    }

    let friendRequests: any = [];
    for (let i = 0; i < userFriendRequest.length; i++) {
      let userDetails = await User.findOne({
        _id: userFriendRequest[i].receiver,
      }).select("_id username gender profileImage");
      friendRequests.push({ user: userDetails, request: userFriendRequest[i] });
    }

    return custom_server_response(
      res,
      200,
      userGetFriendRequestMessage.get_friend_request_success,
      friendRequests
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
