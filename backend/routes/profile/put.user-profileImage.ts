import { Response } from "express";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  userProfileMessage,
  multerImageMessage,
  apiSuccessStatusMessage,
} from "../../function/server-route-messages";
import { User } from "../../models/user-model";
import { CustomRequest } from "../../middleware/user-authorization";
import { uploadImageToCloudinary } from "../../function/server-upload-image";

/**
 * @swagger
 * /api/user/profile/update_profile_image:
 *   put:
 *     summary: Update user profile image.
 *     description: Update the user's profile image with a new image.
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
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *           description: The image file to upload for the user's profile image.
 *     responses:
 *       200:
 *         description: User profile image updated successfully.
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
 *                     _id:
 *                       type: string
 *                       description: The user's ID.
 *                     profileImage:
 *                       type: string
 *                       description: The URL of the updated profile image.
 *     security:
 *       - BearerAuth: []
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

    const file = req.file; // Assuming the file is sent as 'image' field in the form data

    if (!file) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        multerImageMessage.image_required
      );
    }

    // Upload the image to Cloudinary in the specified folder
    const imageUrl = await uploadImageToCloudinary(String(userProfileId), file);

    const newData = await User.findOneAndUpdate(
      { _id: userProfileId },
      { profileImage: imageUrl },
      {
        new: true,
      }
    ).select("_id profileImage");

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userProfileMessage.user_profileImage_update_success,
      newData
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
