import { Response } from "express";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  userProfileMessage,
  apiSuccessStatusMessage,
} from "../../function/server-route-messages";
import { CustomRequest } from "../../middleware/user-authorization";
import { uploadImageToCloudinary } from "../../function/server-upload-image";
import Joi from "joi";
import { Post } from "../../models/post-model";

const postSchema = Joi.object({
  text: Joi.string().max(500),
}).options({ abortEarly: false });

/**
 * @swagger
 * /api/user/profile/add_post:
 *   post:
 *     summary: Add a new post to the user's profile.
 *     description: Create a new post in the user's profile, including text and/or media.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: string
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication token. Use the format "Bearer jwt_token".
 *       - in: formData
 *         name: text
 *         schema:
 *           type: string
 *         description: The text content of the post (optional, max 500 characters).
 *       - in: formData
 *         name: image
 *         type: file
 *         description: An image file to upload with the post (optional).
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post created successfully.
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
 *                   properties:
 *                     text:
 *                       type: string
 *                       description: The text content of the post.
 *                     media:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                             description: The URL of the uploaded media (image).
 *                           _id:
 *                             type: string
 *                             description: The unique ID of the media.
 *                     author:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The unique ID of the author.
 *                     _id:
 *                       type: string
 *                       description: The unique ID of the post.
 *                     createdAt:
 *                       type: string
 *                       description: The creation date of the post.
 *                     updatedAt:
 *                       type: string
 *                       description: The last update date of the post.
 *                     __v:
 *                       type: integer
 *                       description: The version of the post.
 */

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userProfileMessage.user_required
      );
    }

    // Validate request body
    const schemaValidation = await postSchema.validateAsync(req.body);

    const file = req.file;
    const text = req.body.text;

    if (!text && !file) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        "add text or media. minimum one field required"
      );
    }

    let createData: any = { author: req.user };

    if (text) {
      createData.text = text;
    }

    if (file) {
      // Upload the image to Cloudinary in the specified folder
      const imageUrl = await uploadImageToCloudinary(
        String(userProfileId),
        file
      );
      createData.media = { url: imageUrl };
    }

    const newData = await Post.create(createData);

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      "create",
      newData
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
