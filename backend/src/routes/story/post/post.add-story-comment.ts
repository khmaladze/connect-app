import { Request, Response } from "express";
import Joi from "joi";
import { CustomRequest } from "../../../middleware/user-authorization";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import StoryCommentModel from "../../../models/story/story-comment-model";

// Validation schema using Joi
const commentSchema = Joi.object({
  story_id: Joi.string().required(),
  comment: Joi.string().required().max(70), // Limit comment length to a maximum of 70 characters
});

// Messages for different scenarios
const routeMessage = {
  user_can_only_comment_once_on_a_story:
    "User can only comment once on a story.",
  add_comment_success: "Add comment success.",
};

/**
 * @swagger
 * /api/user/story/comment:
 *   post:
 *     summary: Create a new comment
 *     description: Creates a new comment for a story.
 *     tags:
 *       - Story
 *     security:
 *       - BearerAuth: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentRequest'
 *     responses:
 *       200:
 *         description: Comment added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       400:
 *         description: Bad request or user has already commented on the story.
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
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           default: false
 *         message:
 *           type: string
 */
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    // Destructure validated data for easier access
    const { story_id, comment } = req.body;

    // Validate request body using Joi schema
    const validatedData = await commentSchema.validateAsync(req.body);

    // Check if the user has already commented on the story
    const existingComment = await StoryCommentModel.findOne({
      author_id: req.user._id,
      story_id: story_id,
    });

    if (existingComment) {
      // If the user has already commented, return an error response
      return custom_server_response(
        res,
        400,
        routeMessage.user_can_only_comment_once_on_a_story
      );
    }

    // Create a new comment
    const newComment = await StoryCommentModel.create({
      author_id: req.user._id,
      story_id: story_id,
      comment: comment,
    });

    // Return a success response with the newly created comment
    return custom_server_response(
      res,
      200,
      routeMessage.add_comment_success,
      newComment
    );
  } catch (error) {
    // Handle any unexpected errors
    console.log(error);
    return customServerError(res, error);
  }
};
