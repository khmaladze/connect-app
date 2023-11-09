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

/**
 * @swagger
 * /api/user/friend/get_send_request:
 *   get:
 *     summary: Get friend send requests sent by the user.
 *     description: Retrieve pending friend send requests sent by the user.
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
 *     responses:
 *       200:
 *         description: Friend send requests retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique ID of the user who received the send request.
 *                       username:
 *                         type: string
 *                         description: The username of the user who received the send request.
 *                       gender:
 *                         type: string
 *                         description: The gender of the user who received the send request.
 *                       profileImage:
 *                         type: string
 *                         description: The URL of the user's profile image who received the send request.
 *                   request:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique ID of the friend send request.
 *                       sender:
 *                         type: string
 *                         description: The sender of the friend send request.
 *                       receiver:
 *                         type: string
 *                         description: The receiver of the friend send request.
 *     security:
 *       - BearerAuth: []
 */
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

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

    const friendRequestPromises = userFriendRequest.map(async (request) => {
      const userDetails = await User.findOne({
        _id: request.receiver,
      }).select("_id username gender profileImage");

      return { user: userDetails, request };
    });

    const friendRequests = await Promise.all(friendRequestPromises);

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
