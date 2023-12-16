import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { PostLike } from "../../../models/post/post-like-model";

/**
 * @swagger
 * /api/user/profile/check_post_like/{postId}:
 *   get:
 *     summary: Check if the authenticated user has liked a specific post.
 *     description: |
 *       This endpoint checks if the authenticated user has already liked a specific post.
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to check for likes.
 *         example: "654c4ef1f69e755c68cd3079"
 *     responses:
 *       200:
 *         description: Success. Indicates whether the user has liked the post.
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
 *                   type: object
 *                   description: Additional data, if needed.
 *                   properties:
 *                     liked:
 *                       type: boolean
 *                       description: Indicates whether the user has liked the post.
 *       400:
 *         description: Bad Request. Indicates an issue with the request parameters.
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
 *       500:
 *         description: Internal Server Error. Indicates an issue on the server.
 *     security:
 *       - BearerAuth: []
 */

// route message
const routeMessage = {
  like_already_exists: "like already exists",
  like_dont_exists: "like don't exists",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;
    const postId = req.params.postId;

    const isLikeExists = await PostLike.exists({
      post_id: postId,
      like_author_id: userProfileId,
    });

    const count = await PostLike.countDocuments({ post_id: postId });

    if (isLikeExists) {
      return custom_server_response(
        res,
        200,
        routeMessage.like_already_exists,
        { liked: true, count: count }
      );
    }

    return custom_server_response(res, 200, routeMessage.like_dont_exists, {
      liked: false,
      count: count,
    });
  } catch (error) {
    return customServerError(res, error);
  }
};
