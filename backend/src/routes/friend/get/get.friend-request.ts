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

    const userFriendRequest = await UserFriendAdd.find({
      receiver: userProfileId,
      status: "pending",
    }).select("_id sender receiver");

    if (userFriendRequest.length < 1) {
      return custom_server_response(
        res,
        200,
        userGetFriendRequestMessage.get_friend_request_success,
        userFriendRequest
      );
    }

    let friendRequests: any = [];
    for (let i = 0; i < userFriendRequest.length; i++) {
      let userDetails = await User.findOne({
        _id: userFriendRequest[i].sender,
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
