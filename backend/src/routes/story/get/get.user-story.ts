// Import necessary modules and models
import express, { Response } from "express";
import { UserFriend } from "../../../models/friend/friend-model";
import { Story } from "../../../models/story/story-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { custom_server_response } from "../../../function/server-response";
import { User } from "../../../models/user/user-model";

/**
 * @swagger
 * /api/user/story/:
 *   get:
 *     summary: Get storys of user's friends based on friend list type.
 *     tags:
 *       - Story
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination default 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of storys per page default 5
 *     responses:
 *       200:
 *         description: Successful response with user's friends' storys.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/story'  # Reference to your story model
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: No storys found for the user's friends.
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

// Route message constants
const routeMessage = {
  success: "User friends storys fetched successfully",
  nostorysFound: "No storys found for user friends",
  error: "Error fetching user friends storys",
};

/**
 * Sorts storys based on the order of the 'list' property.
 * @param storys - Array of story objects.
 * @returns Sorted array of story objects.
 */
function sortstorysByList(storys: any[]): any[] {
  const order = ["Favorite", "CloseFriend", "Friend"];

  return storys.sort((a: any, b: any) => {
    const indexA = order.indexOf(a.list);
    const indexB = order.indexOf(b.list);

    if (indexA !== indexB) {
      return indexA - indexB;
    }

    return b.createdAt - a.createdAt;
  });
}

// Business logic for getting user's friends' storys
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    // Extract user ID from request
    const userId = req.user._id;

    // Get user's friend list
    const userFriend = await UserFriend.findOne({
      user_profile_id: userId,
    });

    // Check if friend list exists
    if (!userFriend) {
      return custom_server_response(res, 404, routeMessage.nostorysFound);
    }

    // Extract friend IDs with storys
    const friendIdsWithstorys = userFriend.friends
      .filter((friend) => friend.user_id !== userId && friend.user_id !== null)
      .map((friend) => friend.user_id);

    // Get storys of user's friends with author information
    const storys = await Story.find({
      author: { $in: friendIdsWithstorys },
      expiryDate: { $gt: Date.now() },
    }).sort({ createdAt: -1 }); // Sort storys by createdAt in descending order

    // Extract user IDs from story authors
    const authorIds = storys.map((story) => story.author);

    // Find users by _id
    const users = await User.find({ _id: { $in: authorIds } });

    // Add user information to each story object
    const storysWithUserInfo = storys.map((story) => {
      const user: any = users.find((u) => u._id.equals(story.author));
      return {
        ...story.toObject(), // Convert Mongoose document to plain JavaScript object
        user: {
          profileImage: user.profileImage,
          firstname: user.firstname,
          lastname: user.lastname,
          gender: user.gender,
        },
      };
    });

    const sorted = sortstorysByList(storysWithUserInfo);

    return custom_server_response(res, 200, routeMessage.success, sorted);
  } catch (error) {
    return customServerError(res, error);
  }
};
