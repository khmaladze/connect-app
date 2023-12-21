import { Request, Response } from "express";
import { CustomRequest } from "../../../middleware/user-authorization";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { Story } from "../../../models/story/story-model";
import StoryCommentModel from "../../../models/story/story-comment-model";

// Messages for different scenarios
const routeMessages = {
  story_not_found_or_unauthorized:
    "story not found or user not authorized to delete.",
  delete_success: "story associated comment deleted successfully.",
  internal_server_error: "Internal Server Error.",
};

/**
 * Delete a story and its associated comments.
 * @swagger
 * /api/user/story/comment/{storyId}:
 *   post:
 *     summary: Delete a story and associated comments
 *     description: Delete a story and its associated comments by the authenticated user.
 *     tags:
 *       - Story
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: storyId
 *         in: path
 *         description: ID of the story to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: story and associated comments deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: story and associated comments deleted successfully.
 *       404:
 *         description: story not found or user not authorized to delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   default: story not found or user not authorized to delete.
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
    const storyId = req.params.storyId;
    const authorId = req.user._id; // Assuming you have the user information in the request

    // Find and delete the story
    const deletedstory = await Story.findOne({
      _id: storyId,
    });

    if (!deletedstory) {
      return custom_server_response(
        res,
        404,
        routeMessages.story_not_found_or_unauthorized
      );
    }

    // Find and delete the associated comments
    await StoryCommentModel.findOneAndDelete({
      story_id: storyId,
      author_id: authorId,
    });

    return custom_server_response(res, 200, routeMessages.delete_success);
  } catch (error) {
    console.error(error);
    return customServerError(res, error);
  }
};
