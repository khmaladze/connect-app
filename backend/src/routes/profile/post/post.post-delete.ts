import { Request, Response } from "express";
import { CustomRequest } from "../../../middleware/user-authorization";
import { Post } from "../../../models/post/post-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import CommentModel, { Comment } from "../../../models/post/post-comment-model";
import { PostLike } from "../../../models/post/post-like-model";
import { deleteFileFromCloudinary } from "../../../function/server-file-delete";

// Messages for different scenarios
const routeMessages = {
  post_not_found_or_unauthorized:
    "Post not found or user not authorized to delete.",
  post_deleted_successfully: "Post deleted successfully.",
  internal_server_error: "Internal Server Error.",
};

// /**
//  * Helper function to send a custom success response.
//  * @param res - Express Response object
//  * @param message - Success message
//  * @param data - Optional data to include in the response
//  */
// const custom_server_response = (res: Response, message: string, data?: any) => {
//   return res.status(200).json({
//     success: true,
//     message,
//     data,
//   });
// };

// /**
//  * Helper function to send a custom error response.
//  * @param res - Express Response object
//  * @param message - Error message
//  */
// const custom_server_error = (res: Response, message: string) => {
//   return res.status(500).json({
//     success: false,
//     message,
//   });
// };

/**
 * Delete a post.
 * @swagger
 * /api/user/profile/posts/{postId}:
 *   post:
 *     summary: Delete a post
 *     description: Delete a post by the authenticated user.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Post deleted successfully.
 *       404:
 *         description: Post not found or user not authorized to delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   default: Post not found or user not authorized to delete.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   default: Internal Server Error.
 */
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const postId = req.params.postId;
    const authorId = req.user._id; // Assuming you have the user information in the request

    // Find and delete the post
    const deletedPostFile: any = await Post.findOne({
      _id: postId,
      author: authorId,
    }).select("media");

    // Find and delete the post
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      author: authorId,
    });

    if (!deletedPost) {
      // If post not found or user not authorized, return a 404 response
      return custom_server_response(
        res,
        400,
        routeMessages.post_not_found_or_unauthorized
      );
    }

    if (deletedPostFile && deletedPostFile?.media[0]) {
      let mediaType: string =
        deletedPostFile?.media[0].url.slice(
          deletedPostFile?.media[0].url.length - 3,
          deletedPostFile?.media[0].url.length
        ) == "mp4"
          ? "video"
          : "image";
      await deleteFileFromCloudinary(
        String(deletedPostFile?.media[0]?.public_id),
        mediaType
      );
    }

    const likesToDelete = await PostLike.find({
      post_id: postId,
    });

    // If there are comments, delete them
    if (likesToDelete && likesToDelete.length > 0) {
      await PostLike.deleteMany({ post_id: postId });
      //   console.log(
      //     `Deleted ${commentsToDelete.length} comments for post with ID ${postId}`
      //   );
    } else {
      //   console.log(`No comments found for post with ID ${postId}`);
    }

    const commentsToDelete: Comment[] = await CommentModel.find({
      post_id: postId,
    });

    // If there are comments, delete them
    if (commentsToDelete && commentsToDelete.length > 0) {
      await CommentModel.deleteMany({ post_id: postId });
      //   console.log(
      //     `Deleted ${commentsToDelete.length} comments for post with ID ${postId}`
      //   );
    } else {
      //   console.log(`No comments found for post with ID ${postId}`);
    }

    // Return a success response
    return custom_server_response(
      res,
      200,
      routeMessages.post_deleted_successfully
    );
  } catch (error) {
    console.error(error);
    // If there's an internal server error, return a 500 response
    return customServerError(res, error);
  }
};
