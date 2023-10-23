import { Response } from "express";
import Joi from "joi";
import { UserFriendAdd } from "../../models/friend/friend-send-request-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  userSendFriendRequestMessage,
} from "../../function/server-route-messages";
import { CustomRequest } from "../../middleware/user-authorization";
import { User } from "../../models/user/user-model";

// Documentation
/**
 * @swagger
 * /api/user/friend/send_friend_request:
 *   post:
 *     summary: Send a friend request.
 *     description: Send a friend request to another user.
 *     tags:
 *       - Friend
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer jwt_token
 *         description: The user's JWT token for authorization.
 *       - in: body
 *         name: friendRequest
 *         required: true
 *         description: The friend request details.
 *         schema:
 *           type: object
 *           properties:
 *             receiver:
 *               type: string
 *               description: The username of the friend to send a request to.
 *             friend_list:
 *               type: string
 *               enum: [Friend, CloseFriend, Favorite]
 *               description: The friend list to which the user wants to add the friend.
 *     responses:
 *       200:
 *         description: Friend request sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation.
 *                 message:
 *                   type: string
 *                   description: A message indicating the result.
 *       400:
 *         description: Bad request. Friend request already exists or other errors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation (false).
 *                 message:
 *                   type: string
 *                   description: A message indicating the error.
 *       401:
 *         description: Unauthorized or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation (false).
 *                 message:
 *                   type: string
 *                   description: A message indicating unauthorized access.
 *     security:
 *       - BearerAuth: []

 */

// Joi schema for user friend request
const sendFriendRequestSchema = Joi.object({
  receiver: Joi.string().trim().lowercase().required().min(2).max(200),
  friend_list: Joi.string()
    .valid("Friend", "CloseFriend", "Favorite")
    .required(),
});

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userSendFriendRequestMessage.user_required
      );
    }

    // Validate request body
    const schemaValidation = await sendFriendRequestSchema.validateAsync(
      req.body
    );

    // Get data from request body
    const { receiver, friend_list } = req.body;

    // Check that receiver and userProfileId is different
    if (receiver === userProfileId.toString()) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userSendFriendRequestMessage.receiver_not_exists
      );
    }

    // Check if receiver Exists
    const isValidreceiver = await User.findOne({
      _id: receiver,
    });
    if (!isValidreceiver) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userSendFriendRequestMessage.receiver_not_exists
      );
    }

    // Check if the friend request already send
    const friendRequestAlreadyExists = await UserFriendAdd.exists({
      receiver: receiver,
      sender: userProfileId.toString(),
    });
    if (friendRequestAlreadyExists) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userSendFriendRequestMessage.friend_request_already_exists
      );
    }

    // Check if the person already send us friend request
    const receiverfriendRequestAlreadyExists = await UserFriendAdd.exists({
      receiver: userProfileId.toString(),
      sender: receiver,
    });
    if (receiverfriendRequestAlreadyExists) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userSendFriendRequestMessage.person_already_send_you_request
      );
    }

    const sendFriendRequest = await UserFriendAdd.create({
      sender: userProfileId.toString(),
      receiver: receiver,
      friend_list: friend_list,
    });

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userSendFriendRequestMessage.send_friend_request_success,
      sendFriendRequest
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
