// routes/friendRoutes.ts
import express, { Request, Response } from "express";
import { Schema } from "mongoose";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { UserFriend } from "../../../models/friend/friend-model";

const routeMessages = {
  error_cannot_update_friend_list: "Error, can't update friend list",
  friend_list_update_success: "Friend list updated successfully",
  friend_not_found: "Friend not found",
};

// Swagger documentation for update friend list route
/**
 * @swagger
 * /api/user/friend/update-friend-list:
 *   put:
 *     summary: Update the friend_list for a friend in the user's friend list.
 *     tags:
 *       - Friend
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendId:
 *                 type: string
 *                 description: The ID of the friend to be updated.
 *               newFriendListType:
 *                 type: string
 *                 enum: ['Friend', 'CloseFriend', 'Favorite']
 *                 description: The new type of friendship.
 *           required:
 *             - friendId
 *             - newFriendListType
 *     responses:
 *       200:
 *         description: Friend list updated successfully.
 *       404:
 *         description: Friend not found.
 *       500:
 *         description: Internal Server Error.
 *     security:
 *       - BearerAuth: []
 */

/**
 * Handles the business logic for updating the friend list in the user's friend list.
 */
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: Schema.Types.ObjectId = req.user._id;
    const { friendId, newFriendListType } = req.body;

    // Find the user's friend list
    const userFriend = await UserFriend.findOne({
      user_profile_id: userProfileId,
    });

    if (!userFriend) {
      return custom_server_response(res, 404, routeMessages.friend_not_found);
    }

    // Check if the friend is in the user's friend list
    const existingFriendIndex = userFriend.friends.findIndex(
      (friend) => friend.user_id.toString() === friendId
    );

    if (existingFriendIndex !== -1) {
      // If the friend exists, update the friend_list type
      userFriend.friends[existingFriendIndex].friend_list = newFriendListType;

      // Save the updated user friend document
      await userFriend.save();

      return custom_server_response(
        res,
        200,
        routeMessages.friend_list_update_success
      );
    } else {
      return custom_server_response(res, 404, routeMessages.friend_not_found);
    }
  } catch (error) {
    return customServerError(res, error);
  }
};
