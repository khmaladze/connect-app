import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";
import { StoryView } from "../../../models/story/story-view";

/**
 * @swagger
 * /api/user/story/story_view:
 *   post:
 *     summary: Story View.
 *     description: Allow a user to view a specific story.
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
 *                 description: The ID of the story to be viewd.
 *     responses:
 *       '200':
 *         description: Successful story view response.
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
 *                     view_author_id:
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
const storyViewSchema = Joi.object({
  story_id: Joi.string().required(),
});

// route message
const routeMessage = {
  view_already_exists: "view already exists",
  story_view_success: "story view add success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // Validate request body
    const schemaValidation = await storyViewSchema.validateAsync(req.body);

    const { story_id } = req.body;

    const isViewAlreadyExists = await StoryView.exists({
      story_id: story_id,
      view_author_id: userProfileId,
    });

    if (isViewAlreadyExists) {
      return custom_server_response(res, 200, routeMessage.view_already_exists);
    }

    const newData = await StoryView.create({
      story_id: story_id,
      view_author_id: userProfileId,
    });

    return custom_server_response(
      res,
      200,
      routeMessage.story_view_success,
      newData
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
