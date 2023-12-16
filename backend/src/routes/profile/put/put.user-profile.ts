import { Response } from "express";
import Joi from "joi";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { userProfileData } from "../../../data/user-profile";
import { UserProfile } from "../../../models/user/user-profile-model";
import { CustomRequest } from "../../../middleware/user-authorization";

/**
 * @swagger
 * /api/user/profile/profile_info_data:
 *   put:
 *     summary: Update user profile information.
 *     description: Update user profile data, including languages, education, and passions.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - english
 *                     - ...  // Add other available languages here
 *                 description: An array of languages.
 *               education:
 *                 type: string
 *                 enum:
 *                   - high school
 *                   - ...  // Add other available education levels here
 *                 description: The user's education level.
 *               passions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - travel
 *                     - ...  // Add other available passions here
 *                 description: An array of passions.
 *     responses:
 *       200:
 *         description: User profile data updated successfully.
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
 */

const userProfileSchema = Joi.object({
  languages: Joi.array().items(
    Joi.string().valid(...userProfileData.languages)
  ),
  education: Joi.string().valid(...userProfileData.education),
  passions: Joi.array().items(Joi.string().valid(...userProfileData.passions)),
});

interface IUserProfileData {
  languages?: string[];
  education?: string;
  passions?: string[];
}

const routeMessage = {
  add_min_one_fields: "add min one fields",
  userprofile_data_success: "userprofile data add success",
  user_image_update_failed: "user image update failed",
  user_profileImage_update_success: "user profileImage update success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // validate request body
    const schemaValidation = await userProfileSchema.validateAsync(req.body);

    // get data from request body
    const { languages, education, passions }: IUserProfileData = req.body;

    if (!languages && !education && !passions) {
      return custom_server_response(res, 400, routeMessage.add_min_one_fields);
    }

    let userProfileData: IUserProfileData = {
      languages: [],
      education: "",
      passions: [],
    };

    if (languages) {
      userProfileData.languages = languages;
    }

    if (education) {
      userProfileData.education = education;
    }

    if (passions) {
      userProfileData.passions = passions;
    }

    await UserProfile.findOneAndUpdate(
      { user_profile_id: userProfileId },
      userProfileData,
      {
        new: true,
      }
    );

    return custom_server_response(
      res,
      200,
      routeMessage.userprofile_data_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
