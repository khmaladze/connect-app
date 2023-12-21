import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";
import { StoryLike } from "../../../models/story/story-like-model";

/**
 * @swagger
 * /api/user/story/like_story:
 *   post:
 *     summary: Like a story.
 *     description: Allow a user to like a specific story.
 *     tags:
 *       - Story
 *     security:
 *       - BearerAuth: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               story_id:
 *                 type: string
 *                 description: The ID of the story to be liked.
 *     responses:
 *       '200':
 *         description: Successful story like response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the request.
 *                 message:
 *                   type: string
 *                   description: Success message related to the request.
 *                 data:
 *                   type: object
 *                   properties:
 *                     story_id:
 *                       type: string
 *                       description: ID of the liked story.
 *                     like_author_id:
 *                       type: string
 *                       description: ID of the user who liked the story.
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the story like.
 *                     createdAt:
 *                       type: string
 *                       description: Date and time when the story like was created.
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       description: Date and time when the story like was last updated.
 *                       format: date-time
 *                     __v:
 *                       type: number
 *                       description: Version number.
 */

// validation
const storyLikeSchema = Joi.object({
  story_id: Joi.string().required(),
});

// route message
const routeMessage = {
  like_already_exists: "like already exists",
  story_like_success: "story like success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // Validate request body
    const schemaValidation = await storyLikeSchema.validateAsync(req.body);

    const { story_id } = req.body;

    const isLikeAlreadyExists = await StoryLike.exists({
      story_id: story_id,
      like_author_id: userProfileId,
    });

    if (isLikeAlreadyExists) {
      return custom_server_response(res, 400, routeMessage.like_already_exists);
    }

    const newData = await StoryLike.create({
      story_id: story_id,
      like_author_id: userProfileId,
    });

    return custom_server_response(
      res,
      200,
      routeMessage.story_like_success,
      newData
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
