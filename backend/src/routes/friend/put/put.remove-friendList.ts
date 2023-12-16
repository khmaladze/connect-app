// routes/friendRoutes.ts
import express, { Request, Response } from "express";
import { Schema } from "mongoose";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { UserFriend } from "../../../models/friend/friend-model";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";

const routeMessages = {
  error_cannot_remove_friend: "Error, can't remove friend",
  friend_removed_successfully: "Friend removed successfully",
  friend_not_found: "Friend not found",
};

// Swagger documentation for remove friend route
/**
 * @swagger
 * /api/user/friend/remove-friend:
 *   put:
 *     summary: Remove a friend from both users' friend lists.
 *     tags:
 *       - Friend
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the friend to be removed.
 *           required:
 *             - user_id
 *     responses:
 *       200:
 *         description: Friend removed successfully.
 *       404:
 *         description: Friend not found.
 *       500:
 *         description: Internal Server Error.
 *     security:
 *       - BearerAuth: []
 */

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: Schema.Types.ObjectId = req.user._id;
    const { user_id } = req.body;

    // Find the user's friend list
    const userFriend = await UserFriend.findOne({
      user_profile_id: userProfileId,
    });

    if (!userFriend) {
      return custom_server_response(res, 404, routeMessages.friend_not_found);
    }

    // Check if the friend is in the user's friend list
    const existingFriendIndex = userFriend.friends.findIndex(
      (friend) => friend.user_id.toString() === user_id
    );

    if (existingFriendIndex !== -1) {
      // If the friend exists, remove the friend entry from the array
      userFriend.friends.splice(existingFriendIndex, 1);

      // Save the updated user friend document
      await userFriend.save();

      // Find the friend's friend list
      const friendFriend = await UserFriend.findOne({
        user_profile_id: user_id,
      });

      if (friendFriend) {
        // Check if the user is in the friend's friend list
        const userIndexInFriendList = friendFriend.friends.findIndex(
          (friend) => friend.user_id.toString() === userProfileId.toString()
        );

        if (userIndexInFriendList !== -1) {
          // If the user exists in the friend's friend list, remove the user entry from the array
          friendFriend.friends.splice(userIndexInFriendList, 1);

          // Save the updated friend's friend document
          await friendFriend.save();
        }
      }

      await UserFriendAdd.findOneAndDelete({
        sender: user_id,
        receiver: userProfileId,
      });
      await UserFriendAdd.findOneAndDelete({
        sender: userProfileId,
        receiver: user_id,
      });

      return custom_server_response(
        res,
        200,
        routeMessages.friend_removed_successfully
      );
    } else {
      return custom_server_response(res, 404, routeMessages.friend_not_found);
    }
  } catch (error) {
    return customServerError(res, error);
  }
};
