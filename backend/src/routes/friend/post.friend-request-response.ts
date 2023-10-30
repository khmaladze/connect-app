import { Response } from "express";
import { UserFriendAdd } from "../../models/friend/friend-send-request-model";
import { UserFriend } from "../../models/friend/friend-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  getFriendSendRequestMessage,
} from "../../function/server-route-messages";
import { CustomRequest } from "../../middleware/user-authorization";
import Joi from "joi";

// Joi schema for response user friend request
const responseFriendRequestSchema = Joi.object({
  status: Joi.string().trim().required().max(200),
  friend_list: Joi.string().valid("Friend", "CloseFriend", "Favorite"),
});

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

    // Validate request body
    const schemaValidation = await responseFriendRequestSchema.validateAsync(
      req.body
    );

    const { id, status, friend_list } = req.body;

    if (!status) {
      return custom_server_response(
        res,
        200,
        apiSuccessStatusMessage.success,
        "user friend request not found"
      );
    }

    const userFriendRequest = await UserFriendAdd.find({
      _id: id,
      receiver: userProfileId,
      status: "pending",
    });

    if (!userFriendRequest) {
      return custom_server_response(
        res,
        200,
        apiSuccessStatusMessage.success,
        "user friend request not found"
      );
    }

    if (status == "rejected") {
      await UserFriendAdd.findOneAndUpdate(
        {
          _id: id,
          receiver: userProfileId,
          status: status,
        },
        { new: true }
      );
    }

    if (friend_list && status !== "rejected") {
      const receiverData: any = await UserFriendAdd.findOneAndUpdate(
        {
          _id: id,
          receiver: userProfileId,
          status: status,
        },
        { new: true }
      );

      await UserFriend.findOneAndUpdate(
        { user_profile_id: userProfileId },
        {
          $push: {
            friends: [
              { friend_list: "Friend", user_id: userFriendRequest[0].sender },
            ],
          },
        },
        { new: true }
      );

      await UserFriend.findOneAndUpdate(
        { user_profile_id: receiverData[0].sender },
        {
          $push: {
            friends: [
              { friend_list: "Friend", user_id: userFriendRequest[0].sender },
            ],
          },
        },
        { new: true }
      );
    }

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      "response send request success"
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
