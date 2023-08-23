import { Response } from "express";
import Joi from "joi";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  userProfileMessage,
} from "../../function/server-route-messages";
import { userProfileData } from "../../data/user-profile";
import { UserProfile } from "../../models/user-profile-model";
import { CustomRequest } from "../../middleware/user-authorization";

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
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userProfileMessage.user_required
      );
    }

    // validate request body
    const schemaValidation = await userProfileSchema.validateAsync(req.body);

    // get data from request body
    const { languages, education, passions }: IUserProfileData = req.body;

    if (!languages && !education && !passions) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
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
      apiSuccessStatusMessage.success,
      userProfileMessage.userprofile_data_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
