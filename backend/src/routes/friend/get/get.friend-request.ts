import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { userGetFriendRequestMessage } from "../../../function/server-route-messages";
import { CustomRequest } from "../../../middleware/user-authorization";
import { User } from "../../../models/user/user-model";

/**
 * @swagger
 * /api/user/friend/request:
 *   get:
 *     summary: Get friend requests for the user.
 *     description: Retrieve pending friend requests for the user.
 *     tags:
 *       - Friend
 *     responses:
 *       200:
 *         description: Friend requests retrieved successfully.
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
 *                         description: The unique ID of the user.
 *                       username:
 *                         type: string
 *                         description: The username of the user.
 *                       gender:
 *                         type: string
 *                         description: The gender of the user.
 *                       profileImage:
 *                         type: string
 *                         description: The URL of the user's profile image.
 *                   request:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique ID of the friend request.
 *                       sender:
 *                         type: string
 *                         description: The sender of the friend request.
 *                       receiver:
 *                         type: string
 *                         description: The receiver of the friend request.
 *     security:
 *       - BearerAuth: []
 */

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

    const friendRequestPromises = userFriendRequest.map(async (request) => {
      const userDetails = await User.findOne({
        _id: request.sender,
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
