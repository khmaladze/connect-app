// Import necessary modules and components
import { Request, Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { User } from "../../../models/user/user-model";
import StoryCommentModel, {
  StoryComment,
} from "../../../models/story/story-comment-model";

// Messages for different scenarios
const routeMessage = {
  invalid_parameters: "Both story_id and user_id are required.",
  no_comments_found: "No comments found for the given user and story.",
  comments_retrieved_success: "Comments retrieved successfully.",
};

/**
 * @swagger
 * /api/user/story/comments:
 *   get:
 *     summary: Get comments for a user and story
 *     description: Retrieve comments for a specific user and story.
 *     tags:
 *       - Story
 *     security:
 *       - BearerAuth: string
 *     parameters:
 *       - name: story_id
 *         in: query
 *         description: ID of the story for which to retrieve comments
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
 *         description: Bad request or no comments found for the given user and story.
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
 *         story_id:
 *           type: string
 *           required: true
 *         comment:
 *           type: string
 *           required: true
 *           maxLength: 70
 *       required:
 *         - story_id
 *         - comment
 *
 *     CommentResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         author_id:
 *           type: string
 *         story_id:
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

// Route to get comments for a user and story
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    // Destructure story_id and user_id from query parameters
    const { story_id } = req.query;

    // Validate the presence of both story_id and user_id
    if (!story_id) {
      return custom_server_response(res, 400, routeMessage.invalid_parameters);
    }

    // Retrieve comments for the specified user and story
    const comments: StoryComment[] = await StoryCommentModel.find({
      author_id: req.user._id,
      story_id: story_id,
    });

    // Fetch additional information about the user who storyed each comment
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
