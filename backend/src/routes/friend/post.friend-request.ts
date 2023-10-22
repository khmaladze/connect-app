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
 *             reciver:
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
 */

// Joi schema for user friend request
const sendFriendRequestSchema = Joi.object({
  reciver: Joi.string().trim().lowercase().required().min(2).max(200),
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
    const { reciver, friend_list } = req.body;

    // Check if the friend request already send
    const friendRequestAlreadyExists = await UserFriendAdd.exists({
      reciver: reciver,
      sender: userProfileId,
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
    const reciverfriendRequestAlreadyExists = await UserFriendAdd.exists({
      reciver: req.user._id,
      sender: reciver,
    });
    if (reciverfriendRequestAlreadyExists) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userSendFriendRequestMessage.person_already_send_you_request
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
      userSendFriendRequestMessage.send_friend_request_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
