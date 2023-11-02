import { Response } from "express";
import Joi from "joi";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import { userProfileMessage } from "../../function/server-route-messages";
import { userProfileData } from "../../data/user-profile";
import { UserProfile } from "../../models/user/user-profile-model";
import { CustomRequest } from "../../middleware/user-authorization";

// Documentation
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
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication token. Use the format "Bearer jwt_token".
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

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(res, 400, userProfileMessage.user_required);
    }

    // validate request body
    const schemaValidation = await userProfileSchema.validateAsync(req.body);

    // get data from request body
    const { languages, education, passions }: IUserProfileData = req.body;

    if (!languages && !education && !passions) {
      return custom_server_response(
        res,
        400,
        userProfileMessage.add_min_one_fields
      );
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
      userProfileMessage.userprofile_data_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
