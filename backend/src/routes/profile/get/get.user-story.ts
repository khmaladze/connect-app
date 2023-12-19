import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { Story } from "../../../models/story/story-model";

/**
 * @swagger
 * /api/user/profile/storys:
 *   get:
 *     summary: Get all storys of the authenticated user.
 *     description: Retrieve all storys created by the authenticated user.
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: All user storys retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation.
 *                 message:
 *                   type: string
 *                   description: A message indicating the result.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                         description: The text content of the story.
 *                       media:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             url:
 *                               type: string
 *                               description: The URL of the uploaded media (image).
 *                             _id:
 *                               type: string
 *                               description: The unique ID of the media.
 *                       author:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The unique ID of the author.
 *                       _id:
 *                         type: string
 *                         description: The unique ID of the story.
 *                       createdAt:
 *                         type: string
 *                         description: The creation date of the story.
 *                       updatedAt:
 *                         type: string
 *                         description: The last update date of the story.
 *                       __v:
 *                         type: integer
 *                         description: The version of the story.
 *     security:
 *       - BearerAuth: []
 */

const routeMessage = {
  get_user_story: "get user story",
};
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    const userstorys = await Story.find({
      author: userProfileId,
      expiryDate: { $gt: Date.now() },
    }).sort("-createdAt");

    return custom_server_response(
      res,
      200,
      routeMessage.get_user_story,
      userstorys
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
