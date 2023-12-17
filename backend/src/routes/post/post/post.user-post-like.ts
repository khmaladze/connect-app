import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";
import { PostLike } from "../../../models/post/post-like-model";

/**
 * @swagger
 * /api/user/post/like_post:
 *   post:
 *     summary: Like a post.
 *     description: Allow a user to like a specific post.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: string
 *                 description: The ID of the post to be liked.
 *     responses:
 *       '200':
 *         description: Successful post like response.
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
 *                     post_id:
 *                       type: string
 *                       description: ID of the liked post.
 *                     like_author_id:
 *                       type: string
 *                       description: ID of the user who liked the post.
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the post like.
 *                     createdAt:
 *                       type: string
 *                       description: Date and time when the post like was created.
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       description: Date and time when the post like was last updated.
 *                       format: date-time
 *                     __v:
 *                       type: number
 *                       description: Version number.
 */

// validation
const postLikeSchema = Joi.object({
  post_id: Joi.string().required(),
});

// route message
const routeMessage = {
  like_already_exists: "like already exists",
  post_like_success: "post like success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // Validate request body
    const schemaValidation = await postLikeSchema.validateAsync(req.body);

    const { post_id } = req.body;

    const isLikeAlreadyExists = await PostLike.exists({
      post_id: post_id,
      like_author_id: userProfileId,
    });

    if (isLikeAlreadyExists) {
      return custom_server_response(res, 400, routeMessage.like_already_exists);
    }

    const newData = await PostLike.create({
      post_id: post_id,
      like_author_id: userProfileId,
    });

    return custom_server_response(
      res,
      200,
      routeMessage.post_like_success,
      newData
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
