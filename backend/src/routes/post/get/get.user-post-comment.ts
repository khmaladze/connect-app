// Import necessary modules and components
import { Request, Response } from "express";
import CommentModel, { Comment } from "../../../models/post/post-comment-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { User } from "../../../models/user/user-model";
// import { User } from "../../../models/user/user-model";

// Messages for different scenarios
const routeMessage = {
  invalid_parameters: "Both post_id and user_id are required.",
  no_comments_found: "No comments found for the given user and post.",
  comments_retrieved_success: "Comments retrieved successfully.",
};

/**
 * @swagger
 * /api/user/post/comments:
 *   get:
 *     summary: Get comments for a user and post
 *     description: Retrieve comments for a specific user and post.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: string
 *     parameters:
 *       - name: post_id
 *         in: query
 *         description: ID of the post for which to retrieve comments
 *         required: true
 *         schema:
 *           type: string
 *       - name: user_id
 *         in: query
 *         description: ID of the user for which to retrieve comments
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentResponse'
 *       400:
 *         description: Bad request or no comments found for the given user and post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentRequest:
 *       type: object
 *       properties:
 *         post_id:
 *           type: string
 *           required: true
 *         comment:
 *           type: string
 *           required: true
 *           maxLength: 70
 *       required:
 *         - post_id
 *         - comment
 *
 *     CommentResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         author_id:
 *           type: string
 *         post_id:
 *           type: string
 *         comment:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 *
 *
 */

// Route to get comments for a user and post
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    // Destructure post_id and user_id from query parameters
    const { post_id } = req.query;

    // Validate the presence of both post_id and user_id
    if (!post_id) {
      return custom_server_response(res, 400, routeMessage.invalid_parameters);
    }

    // Retrieve comments for the specified user and post
    const comments: Comment[] = await CommentModel.find({
      author_id: req.user._id,
      post_id: post_id,
    });

    // Fetch additional information about the user who posted each comment
    const commentsWithUserInfo = await Promise.all(
      comments.map(async (comment) => {
        const user = await User.findOne({ _id: comment.author_id });
        return {
          ...comment.toObject(),
          author_profileImage: user?.profileImage || "",
        };
      })
    );

    // Return success response with the retrieved comments
    return custom_server_response(
      res,
      200,
      routeMessage.comments_retrieved_success,
      commentsWithUserInfo
    );
  } catch (error) {
    // Handle any unexpected errors
    console.log(error);
    return customServerError(res, error);
  }
};
