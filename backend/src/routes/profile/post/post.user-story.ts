import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";
import { uploadToCloudinary } from "../../../function/server-upload-image-video";
import { Story } from "../../../models/story/story-model";

/**
 * @swagger
 * /api/user/profile/add_story:
 *   post:
 *     summary: Add a new story to the user's profile.
 *     description: Create a new story in the user's profile, including text and/or media.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: string
 *     parameters:
 *       - in: formData
 *         name: text
 *         schema:
 *           type: string
 *         description: The text content of the story (optional, max 500 characters).
 *       - in: formData
 *         name: image
 *         type: file
 *         description: An image file to upload with the story (optional).
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
 *         description: story created successfully.
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
 *                       description: The text content of the story.
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
 *                       description: The unique ID of the story.
 *                     createdAt:
 *                       type: string
 *                       description: The creation date of the story.
 *                     updatedAt:
 *                       type: string
 *                       description: The last update date of the story.
 *                     __v:
 *                       type: integer
 *                       description: The version of the story.
 */

const storySchema = Joi.object({
  text: Joi.string().max(500),
  friendList: Joi.string().valid("Friend", "CloseFriend", "Favorite"),
});

const routeMessage = {
  add_text_or_image: "please add text or image",
  story_created_success: "story created success",
};

export const validFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/mpeg",
];

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // Validate request body
    const schemaValidation = await storySchema.validateAsync(req.body);

    const file = req.file;
    const text = req.body.text;
    const friendList = req.body.friendList;

    if (!text && !file) {
      return custom_server_response(res, 400, routeMessage.add_text_or_image);
    }

    let createData: any = { author: req.user };

    if (text) {
      createData.text = text;
    }

    if (friendList) {
      createData.list = friendList;
    }

    const fiveDay = 1000 * 60 * 60 * 24 * 5;
    createData.expiryDate = Date.now() + fiveDay;

    if (file) {
      // Check if the file type is valid (image or video)
      if (!validFileTypes.includes(file.mimetype)) {
        return custom_server_response(res, 400, "Invalid file type");
      }

      // Upload the file to Cloudinary in the specified folder
      const file_url = await uploadToCloudinary(String(userProfileId), file);
      createData.media = {
        url: file_url.secure_url,
        public_id: file_url.public_id,
      };
    }

    const newData = await Story.create(createData);

    return custom_server_response(
      res,
      200,
      routeMessage.story_created_success,
      newData
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
