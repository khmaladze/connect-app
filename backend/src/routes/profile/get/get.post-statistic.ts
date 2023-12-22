import { Response } from "express";
import { CustomRequest } from "../../../middleware/user-authorization";
import { PostLike } from "../../../models/post/post-like-model";
import { User } from "../../../models/user/user-model";
import CommentModel from "../../../models/post/post-comment-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { Post } from "../../../models/post/post-model";

const routeMessages = {
  get_post_likes_and_comment_success: "get post likes and comment success",
  not_auth_user: "You are not authorized to view likes for this post",
  post_not_found: "Post not found",
};

/**
 * @swagger
 *   /api/user/profile/posts/post-like-comment/{postId}:
 *   get:
 *     summary: Get likes for a post
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the list of likes for the post
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
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 *     security:
 *       - BearerAuth: []
 */

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const postId = req.params.postId;

    // Check if req.user._id is the same as the author in the Post model
    const post = await Post.findById(postId);
    if (!post) {
      return custom_server_response(res, 404, routeMessages.post_not_found);
    }

    if (req.user._id.toString() !== post.author.toString()) {
      return custom_server_response(res, 400, routeMessages.not_auth_user);
    }

    // Get likes for the post
    const likes = await PostLike.find({ post_id: postId });

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

    // Get comments for the post
    const comments = await CommentModel.find({ post_id: postId });

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

    const likesAndCommentsData = {
      likes: {
        count: likesWithUserInfo.length,
        data: likesWithUserInfo,
      },
      comments: {
        count: commentsWithUserInfo.length,
        data: commentsWithUserInfo,
      },
    };

    return custom_server_response(
      res,
      200,
      routeMessages.get_post_likes_and_comment_success,
      likesAndCommentsData
    );
  } catch (error) {
    console.error("Error retrieving likes and comments:", error);
    return customServerError(res, error);
  }
};
