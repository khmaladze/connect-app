import { Request, Response } from "express";
import { CustomRequest } from "../../../middleware/user-authorization";
import { Post } from "../../../models/post/post-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import CommentModel from "../../../models/post/post-comment-model";

// Messages for different scenarios
const routeMessages = {
  post_not_found_or_unauthorized:
    "Post not found or user not authorized to delete.",
  delete_success: "Post associated comment deleted successfully.",
  internal_server_error: "Internal Server Error.",
};

/**
 * Delete a post and its associated comments.
 * @swagger
 * /api/user/post/comment/{postId}:
 *   post:
 *     summary: Delete a post and associated comments
 *     description: Delete a post and its associated comments by the authenticated user.
 *     tags:
 *       - Post
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
 *         description: Post and associated comments deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Post and associated comments deleted successfully.
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
    const deletedPost = await Post.findOne({
      _id: postId,
    });

    if (!deletedPost) {
      return custom_server_response(
        res,
        404,
        routeMessages.post_not_found_or_unauthorized
      );
    }

    // Find and delete the associated comments
    await CommentModel.findOneAndDelete({
      post_id: postId,
      author_id: authorId,
    });

    return custom_server_response(res, 200, routeMessages.delete_success);
  } catch (error) {
    console.error(error);
    return customServerError(res, error);
  }
};
