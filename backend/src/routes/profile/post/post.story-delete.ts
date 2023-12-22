import { Request, Response } from "express";
import { CustomRequest } from "../../../middleware/user-authorization";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import CommentModel from "../../../models/story/story-comment-model";
import { deleteFileFromCloudinary } from "../../../function/server-file-delete";
import { StoryLike } from "../../../models/story/story-like-model";
import { Story } from "../../../models/story/story-model";

// Messages for different scenarios
const routeMessages = {
  story_not_found_or_unauthorized:
    "story not found or user not authorized to delete.",
  story_deleted_successfully: "story deleted successfully.",
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
 * Delete a story.
 * @swagger
 * /api/user/profile/storys/{storyId}:
 *   post:
 *     summary: Delete a story
 *     description: Delete a story by the authenticated user.
 *     tags:
 *       - Profile
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
 *         description: story deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: story deleted successfully.
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
    const deletedstoryFile: any = await Story.findOne({
      _id: storyId,
      author: authorId,
    }).select("media");

    // Find and delete the story
    const deletedstory = await Story.findOneAndDelete({
      _id: storyId,
      author: authorId,
    });

    if (!deletedstory) {
      // If story not found or user not authorized, return a 404 response
      return custom_server_response(
        res,
        400,
        routeMessages.story_not_found_or_unauthorized
      );
    }

    if (deletedstoryFile && deletedstoryFile?.media[0]) {
      let mediaType: string =
        deletedstoryFile?.media[0].url.slice(
          deletedstoryFile?.media[0].url.length - 3,
          deletedstoryFile?.media[0].url.length
        ) == "mp4"
          ? "video"
          : "image";
      await deleteFileFromCloudinary(
        String(deletedstoryFile?.media[0]?.public_id),
        mediaType
      );
    }

    const likesToDelete = await StoryLike.find({
      story_id: storyId,
    });

    // If there are comments, delete them
    if (likesToDelete && likesToDelete.length > 0) {
      await StoryLike.deleteMany({ story_id: storyId });
      //   console.log(
      //     `Deleted ${commentsToDelete.length} comments for story with ID ${storyId}`
      //   );
    } else {
      //   console.log(`No comments found for story with ID ${storyId}`);
    }

    const commentsToDelete: Comment[] = await CommentModel.find({
      story_id: storyId,
    });

    // If there are comments, delete them
    if (commentsToDelete && commentsToDelete.length > 0) {
      await CommentModel.deleteMany({ story_id: storyId });
      //   console.log(
      //     `Deleted ${commentsToDelete.length} comments for story with ID ${storyId}`
      //   );
    } else {
      //   console.log(`No comments found for story with ID ${storyId}`);
    }

    // Return a success response
    return custom_server_response(
      res,
      200,
      routeMessages.story_deleted_successfully
    );
  } catch (error) {
    console.error(error);
    // If there's an internal server error, return a 500 response
    return customServerError(res, error);
  }
};
