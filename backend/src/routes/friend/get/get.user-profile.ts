import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { User } from "../../../models/user/user-model";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";

// Documentaion
/**
 * @swagger
 * /api/user/friend/{username}:
 *   get:
 *     summary: Get a friend's profile by username.
 *     description: Retrieve a friend's profile information by their username.
 *     tags:
 *       - Friend
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the friend whose profile you want to view.
 *     responses:
 *       200:
 *         description: Friend's profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' # Replace with the actual schema used in your User model
 *       400:
 *         description: Bad request or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *     security:
 *       - BearerAuth: []
 */

const routeMessage = {
  username_required: "username required",
  user_not_found: "user not found",
  user_get_success: "user get success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // Get data from param
    const username = req.params.username;

    if (!username) {
      return custom_server_response(res, 400, routeMessage.username_required);
    }

    const getUserProfile = await User.findOne({
      username,
    }).select("_id username profileImage gender");

    if (!getUserProfile) {
      return custom_server_response(res, 400, routeMessage.user_not_found);
    }

    if (getUserProfile._id.toString() == userProfileId.toString()) {
      return custom_server_response(res, 400, routeMessage.user_not_found);
    }

    // Check if we already send request
    const sendRequestAlready = await UserFriendAdd.find({
      sender: userProfileId,
      receiver: getUserProfile._id.toString(),
    });

    if (sendRequestAlready.length > 0) {
      if (sendRequestAlready[0].status == "accepted") {
        return custom_server_response(res, 400, "user is already friend");
      }
      return custom_server_response(res, 400, "you already send");
    }

    // Check if user already send us friend request
    const userAlreadySendFriendRequest = await UserFriendAdd.find({
      receiver: userProfileId,
      sender: getUserProfile._id.toString(),
    });

    if (userAlreadySendFriendRequest.length > 0) {
      if (userAlreadySendFriendRequest[0].status == "accepted") {
        return custom_server_response(res, 400, "user is already friend");
      }
      if (userAlreadySendFriendRequest[0].status == "rejected") {
        return custom_server_response(
          res,
          200,
          routeMessage.user_get_success,
          getUserProfile
        );
      } else {
        return custom_server_response(res, 400, "user send you");
      }
    }

    return custom_server_response(
      res,
      200,
      routeMessage.user_get_success,
      getUserProfile
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
