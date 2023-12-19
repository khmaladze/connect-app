// Import necessary modules and models
import express, { Response } from "express";
import { UserFriend } from "../../../models/friend/friend-model";
import { Post } from "../../../models/post/post-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { custom_server_response } from "../../../function/server-response";
import { User } from "../../../models/user/user-model";

/**
 * @swagger
 * /api/user/post/:
 *   get:
 *     summary: Get posts of user's friends based on friend list type.
 *     tags:
 *       - Post
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
 *         description: Number of posts per page default 5
 *     responses:
 *       200:
 *         description: Successful response with user's friends' posts.
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
 *                     $ref: '#/components/schemas/Post'  # Reference to your Post model
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
 *         description: No posts found for the user's friends.
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
  success: "User friends posts fetched successfully",
  noPostsFound: "No posts found for user friends",
  error: "Error fetching user friends posts",
};

/**
 * Sorts posts based on the order of the 'list' property.
 * @param posts - Array of post objects.
 * @returns Sorted array of post objects.
 */
function sortPostsByList(posts: any[]): any[] {
  const order = ["Favorite", "CloseFriend", "Friend"];

  return posts.sort((a: any, b: any) => {
    const indexA = order.indexOf(a.list);
    const indexB = order.indexOf(b.list);

    if (indexA !== indexB) {
      return indexA - indexB;
    }

    return b.createdAt - a.createdAt;
  });
}

// Business logic for getting user's friends' posts
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    // Extract user ID from request
    const userId = req.user._id;

    // Extract pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Get user's friend list
    const userFriend = await UserFriend.findOne({
      user_profile_id: userId,
    });

    // Check if friend list exists
    if (!userFriend) {
      return custom_server_response(res, 404, routeMessage.noPostsFound);
    }

    // Extract friend IDs with posts
    const friendIdsWithPosts = userFriend.friends
      .filter((friend) => friend.user_id !== userId && friend.user_id !== null)
      .map((friend) => friend.user_id);

    // Get posts of user's friends with author information
    const posts = await Post.find({
      author: { $in: friendIdsWithPosts },
      expiryDate: { $gt: Date.now() },
    })
      .sort({ createdAt: -1 }) // Sort posts by createdAt in descending order
      .limit(pageSize) // Limit the number of posts per page
      .skip(skip); // Skip posts based on pagination

    // Check if there are more posts
    const hasMore = posts.length === pageSize;

    // Extract user IDs from post authors
    const authorIds = posts.map((post) => post.author);

    // Find users by _id
    const users = await User.find({ _id: { $in: authorIds } });

    // Add user information to each post object
    const postsWithUserInfo = posts.map((post) => {
      const user: any = users.find((u) => u._id.equals(post.author));
      return {
        ...post.toObject(), // Convert Mongoose document to plain JavaScript object
        user: {
          profileImage: user.profileImage,
          firstname: user.firstname,
          lastname: user.lastname,
          gender: user.gender,
        },
      };
    });

    const sorted = sortPostsByList(postsWithUserInfo);

    return custom_server_response(res, 200, routeMessage.success, sorted);
  } catch (error) {
    return customServerError(res, error);
  }
};
