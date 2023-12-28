import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { UserFriend } from "../../../models/friend/friend-model";
import { User } from "../../../models/user/user-model";
import { Post } from "../../../models/post/post-model";
import { Story } from "../../../models/story/story-model";
import { UserProfile } from "../../../models/user/user-profile-model";

/**
 * @swagger
 * /api/user/userprofile/{profileId}:
 *   get:
 *     summary:
 *     description:
 *     tags:
 *       - UserProfile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with user profile, posts, and stories.
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
 *                   type: object
 *                   properties:
 *                     userProfileData:
 *                       $ref: '#/components/schemas/User'  # Reference to your User model
 *                     username:
 *                       type: string
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'  # Reference to your Post model
 *                     stories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Story'  # Reference to your Story model
 *       404:
 *         description: User is not in your friend list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

const routeMessage = {
  success: "User profile and posts fetched successfully",
  notInFriendList: "User is not in your friend list",
  error: "Error fetching user profile and posts",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId = req.user._id;
    const { profileId } = req.params;

    // Check if the target user is in the friend list
    const isFriend = await UserFriend.exists({
      user_profile_id: userProfileId,
      friends: { $elemMatch: { user_id: profileId } },
    });

    if (!isFriend) {
      return custom_server_response(res, 404, routeMessage.notInFriendList);
    }

    // Fetch user profile data
    const userBasicProfileData: any = await User.findOne({
      _id: profileId,
    }).select("_id firstname lastname username gender profileImage");

    const userProfileData: any = await UserProfile.findOne({
      user_profile_id: profileId,
    });

    // Fetch user's posts
    const userPosts = await Post.find({
      author: profileId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(20);

    // Fetch user's stories
    const userStories = await Story.find({
      author: profileId,
      expiryDate: { $gt: Date.now() },
    }).sort({
      createdAt: -1,
    });

    return custom_server_response(res, 200, routeMessage.success, {
      user: userBasicProfileData,
      userProfile: userProfileData,
      posts: userPosts,
      stories: userStories,
    });
  } catch (error) {
    return customServerError(res, error);
  }
};
