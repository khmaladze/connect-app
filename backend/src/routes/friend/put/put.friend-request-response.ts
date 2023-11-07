import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { UserFriend } from "../../../models/friend/friend-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { getFriendSendRequestMessage } from "../../../function/server-route-messages";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";

// Joi schema for response user friend request
const responseFriendRequestSchema = Joi.object({
  id: Joi.string(),
  status: Joi.string()
    .valid("pending", "accepted", "rejected")
    .trim()
    .required()
    .max(200),
  friend_list: Joi.string().valid("Friend", "CloseFriend", "Favorite"),
});

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // Validate request body
    const schemaValidation = await responseFriendRequestSchema.validateAsync(
      req.body
    );

    const { id, status, friend_list } = req.body;

    if (!status) {
      return custom_server_response(res, 400, "you reject friend request");
    }

    const userFriendRequest = await UserFriendAdd.find({
      _id: id,
      receiver: userProfileId,
      status: "pending",
    });

    if (userFriendRequest.length < 1) {
      return custom_server_response(res, 200, "user friend request not found");
    }

    // if user reject
    if (status == "rejected") {
      await UserFriendAdd.findByIdAndUpdate(
        id,
        { status: "rejected" },
        { new: true }
      );

      return custom_server_response(
        res,
        200,
        "response send request success reject"
      );
    }

    // if user accepted
    if (friend_list && status !== "rejected") {
      const alreadyFriends: any = await UserFriendAdd.find({
        _id: id,
        status: "accepted",
      });

      if (alreadyFriends.length > 0) {
        return custom_server_response(res, 400, "already friends");
      }

      await UserFriend.findOneAndUpdate(
        { user_profile_id: userProfileId },
        {
          $push: {
            friends: [
              {
                friend_list: friend_list,
                user_id: userFriendRequest[0].sender,
              },
            ],
          },
        },
        { new: true }
      );

      await UserFriend.findOneAndUpdate(
        { user_profile_id: userFriendRequest[0].sender },
        {
          $push: {
            friends: [
              {
                friend_list: userFriendRequest[0].friend_list,
                user_id: userFriendRequest[0].receiver,
              },
            ],
          },
        },
        { new: true }
      );

      // update userFriendAdd
      await UserFriendAdd.findByIdAndUpdate(
        id,
        { status: "accepted" },
        { new: true }
      );
    }

    return custom_server_response(res, 200, "response send request success");
  } catch (error) {
    return customServerError(res, error);
  }
};
