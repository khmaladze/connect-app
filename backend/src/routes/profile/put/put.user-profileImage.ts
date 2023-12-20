import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { User } from "../../../models/user/user-model";
import { CustomRequest } from "../../../middleware/user-authorization";
import { uploadImageToCloudinary } from "../../../function/server-upload-image";
import { deleteFileFromCloudinary } from "../../../function/server-file-delete";

/**
 * @swagger
 * /api/user/profile/update_profile_image:
 *   put:
 *     summary: Update user profile image.
 *     description: Update the user's profile image with a new image.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: string
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
 */

const routeMessage = {
  add_min_one_fields: "add min one fields",
  userprofile_data_success: "userprofile data add success",
  user_image_update_failed: "user image update failed",
  user_profileImage_update_success: "user profileImage update success",
};

const multerImageMessage = {
  image_required: "image required",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    const file = req.file; // Assuming the file is sent as 'image' field in the form data

    if (!file) {
      return custom_server_response(
        res,
        400,
        multerImageMessage.image_required
      );
    }

    // Upload the image to Cloudinary in the specified folder
    const imageUrl = await uploadImageToCloudinary(String(userProfileId), file);

    const deleteOldImageUrl: any = await User.findOne({
      _id: userProfileId,
    }).select("_id profileImagePublicId");

    if (deleteOldImageUrl) {
      const deleted = await deleteFileFromCloudinary(
        String(deleteOldImageUrl?.profileImagePublicId),
        "image"
      );
      if (!deleted) {
        return custom_server_response(
          res,
          400,
          routeMessage.user_image_update_failed
        );
      }
    }

    const newData = await User.findOneAndUpdate(
      { _id: userProfileId },
      {
        profileImage: imageUrl.secure_url,
        profileImagePublicId: imageUrl.public_id,
      },
      {
        new: true,
      }
    ).select("_id profileImage");

    return custom_server_response(
      res,
      200,
      routeMessage.user_profileImage_update_success,
      newData
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
