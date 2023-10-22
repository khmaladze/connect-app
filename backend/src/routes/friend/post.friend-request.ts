import { Response } from "express";
import Joi from "joi";
import { UserFriendAdd } from "../../models/friend/friend-send-request-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  registerUserMessage,
} from "../../function/server-route-messages";
import { CustomRequest } from "../../middleware/user-authorization";

// Joi schema for user friend request
const sendFriendRequestSchema = Joi.object({
  reciver: Joi.string().trim().lowercase().required().min(2).max(200),
  friend_list: Joi.string()
    .valid("Friend", "CloseFriend", "Favorite")
    .required(),
});

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    // Validate request body
    const schemaValidation = await sendFriendRequestSchema.validateAsync(
      req.body
    );

    // Get data from request body
    const { reciver, friend_list } = req.body;

    // Check if the friend request already send
    const friendRequestAlreadyExists = await UserFriendAdd.exists({
      reciver: reciver,
      sender: req.user._id,
    });
    if (friendRequestAlreadyExists) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        registerUserMessage.user_email_exist
      );
    }

    // Check if the person already send us friend request
    const reciverfriendRequestAlreadyExists = await UserFriendAdd.exists({
      reciver: req.user._id,
      sender: reciver,
    });
    if (reciverfriendRequestAlreadyExists) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        registerUserMessage.user_email_exist
      );
    }

    const sendFriendRequest = await UserFriendAdd.create({
      sender: req.user._id,
      receiver: reciver,
      friend_list: friend_list,
    });

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      registerUserMessage.auth_user_register
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
