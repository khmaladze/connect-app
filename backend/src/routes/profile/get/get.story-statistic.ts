import { Response } from "express";
import { CustomRequest } from "../../../middleware/user-authorization";
import { User } from "../../../models/user/user-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { Story } from "../../../models/story/story-model";
import { StoryLike } from "../../../models/story/story-like-model";
import StoryCommentModel from "../../../models/story/story-comment-model";
import { StoryView } from "../../../models/story/story-view";

const routeMessages = {
  get_story_likes_and_comment_success: "get story likes and comment success",
  not_auth_user: "You are not authorized to view likes for this story",
  story_not_found: "story not found",
};

/**
 * @swagger
 *   /api/user/profile/storys/story-like-comment/{storyId}:
 *   get:
 *     summary: Get likes for a story
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the list of likes for the story
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Like'
 *       404:
 *         description: story not found
 *       500:
 *         description: Internal Server Error
 *     security:
 *       - BearerAuth: []
 */

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const storyId = req.params.storyId;

    // Check if req.user._id is the same as the author in the story model
    const story = await Story.findById(storyId);
    if (!story) {
      return custom_server_response(res, 404, routeMessages.story_not_found);
    }

    if (req.user._id.toString() !== story.author.toString()) {
      return custom_server_response(res, 400, routeMessages.not_auth_user);
    }

    // Get likes for the story
    const likes = await StoryLike.find({ story_id: storyId });

    // Get user information for each like
    const likesWithUserInfo = await Promise.all(
      likes.map(async (like: any) => {
        const user = await User.findById(like.like_author_id).select(
          "username profileImage"
        );
        return {
          user_id: user?._id,
          username: user?.username,
          profileImage: user?.profileImage,
          createdAt: like.createdAt,
          updatedAt: like.updatedAt,
        };
      })
    );

    // Get comments for the story
    const comments = await StoryCommentModel.find({ story_id: storyId });

    // Get user information for each comment
    const commentsWithUserInfo = await Promise.all(
      comments.map(async (comment: any) => {
        const user = await User.findById(comment.author_id).select(
          "username profileImage"
        );
        return {
          user_id: user?._id,
          username: user?.username,
          profileImage: user?.profileImage,
          comment_text: comment.comment,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        };
      })
    );

    // Get storyViews for the story
    const storyViews = await StoryView.find({ story_id: storyId });

    // Get user information for each story views
    const storyViewsWithUserInfo = await Promise.all(
      storyViews.map(async (storyView: any) => {
        const user = await User.findById(storyView.view_author_id).select(
          "username profileImage"
        );
        return {
          user_id: user?._id,
          username: user?.username,
          profileImage: user?.profileImage,
          createdAt: storyView.createdAt,
          updatedAt: storyView.updatedAt,
        };
      })
    );

    const likesAndCommentsAndViewsData = {
      likes: {
        count: likesWithUserInfo.length,
        data: likesWithUserInfo,
      },
      comments: {
        count: commentsWithUserInfo.length,
        data: commentsWithUserInfo,
      },
      views: {
        count: storyViewsWithUserInfo.length,
        data: storyViewsWithUserInfo,
      },
    };

    return custom_server_response(
      res,
      200,
      routeMessages.get_story_likes_and_comment_success,
      likesAndCommentsAndViewsData
    );
  } catch (error) {
    console.error("Error retrieving likes and comments:", error);
    return customServerError(res, error);
  }
};
