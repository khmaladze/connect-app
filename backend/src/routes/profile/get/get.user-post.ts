import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { userProfileMessage } from "../../../function/server-route-messages";
import { CustomRequest } from "../../../middleware/user-authorization";
import { Post } from "../../../models/post/post-model";

/**
 * @swagger
 * /api/user/profile/posts:
 *   get:
 *     summary: Get all posts of the authenticated user.
 *     description: Retrieve all posts created by the authenticated user.
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer jwt_token
 *         description: The user's JWT token for authorization.
 *     responses:
 *       200:
 *         description: All user posts retrieved successfully.
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
 *                         description: The text content of the post.
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
 *                         description: The unique ID of the post.
 *                       createdAt:
 *                         type: string
 *                         description: The creation date of the post.
 *                       updatedAt:
 *                         type: string
 *                         description: The last update date of the post.
 *                       __v:
 *                         type: integer
 *                         description: The version of the post.
 *     security:
 *       - BearerAuth: []
 */

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(res, 400, userProfileMessage.user_required);
    }

    // Retrieve all posts created by the authenticated user
    const userPosts = await Post.find({ author: userProfileId }).sort(
      "-createdAt"
    );

    return custom_server_response(res, 200, "user_post", userPosts);
  } catch (error) {
    return customServerError(res, error);
  }
};
