import { Response } from "express";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  getUserFriendProfileMessage,
} from "../../function/server-route-messages";
import { CustomRequest } from "../../middleware/user-authorization";
import { User } from "../../models/user/user-model";

// Documentaion
/**
 * @swagger
 * /api/user/profile/{username}:
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

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        getUserFriendProfileMessage.user_required
      );
    }

    // Get data from param
    const username = req.params.username;

    if (!username) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.success,
        getUserFriendProfileMessage.username_required
      );
    }

    const getUserProfile = await User.findOne({
      username,
    }).select("username profileImage gender");

    if (!getUserProfile) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.success,
        getUserFriendProfileMessage.user_not_found
      );
    }

    if (getUserProfile._id.toString() == userProfileId.toString()) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.success,
        getUserFriendProfileMessage.user_not_found
      );
    }

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      getUserFriendProfileMessage.user_get_success,
      getUserProfile
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
