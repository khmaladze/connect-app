import { Response } from "express";
import { CustomRequest } from "../../../middleware/user-authorization";
import { PostLike } from "../../../models/post/post-like-model";
import { User } from "../../../models/user/user-model";
import CommentModel from "../../../models/post/post-comment-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";

export const businessLogic = async (req: CustomRequest, res: Response) => {
  const postId = req.params.postId;

  try {
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
      "get post likes and comment success",
      likesAndCommentsData
    );
  } catch (error) {
    console.error("Error retrieving likes and comments:", error);
    return customServerError(res, error);
  }
};
