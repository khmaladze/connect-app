import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { UserProfile } from "../../../models/user/user-profile-model";
import { CustomRequest } from "../../../middleware/user-authorization";

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile data
 *     description: Retrieve user profile data.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: string
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     languages:
 *                       type: array
 *                       items:
 *                         type: string
 *                     zodiac:
 *                       type: string
 *                     passions:
 *                       type: array
 *                       items:
 *                         type: string
 *                     user_profile_id:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                     __v:
 *                       type: number
 *             example:
 *               success: true
 *               message: "User profile data retrieved successfully"
 *               data:
 *                 _id: "652f7a87c2f8f7bca68ab706"
 *                 languages: []
 *                 zodiac: "capricorn"
 *                 passions: []
 *                 user_profile_id: "652f7a87c2f8f7bca68ab704"
 *                 createdAt: "2023-10-18T06:26:15.777Z"
 *                 updatedAt: "2023-10-18T06:26:15.777Z"
 *                 __v: 0
 *       401:
 *         description: Unauthorized or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */

const routeMessage = {
  add_min_one_fields: "add min one fields",
  userprofile_data_success: "userprofile data add success",
  user_image_update_failed: "user image update failed",
  user_profileImage_update_success: "user profileImage update success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    const userData = await UserProfile.findOne({
      user_profile_id: userProfileId,
    });

    return custom_server_response(
      res,
      200,
      routeMessage.userprofile_data_success,
      userData
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
