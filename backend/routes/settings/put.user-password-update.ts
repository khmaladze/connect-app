import { Response } from "express";
import userActiveModel from "../../models/user-active-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import { CustomRequest } from "../../middleware/user-authorization";
import {
  apiSuccessStatusMessage,
  userSettingsUserActiveMessage,
} from "../../function/server-route-messages";
import { User } from "../../models/user-model";
import bcrypt from "bcryptjs";
import Joi from "joi";

// Joi schema for user passwordUpdate
const passwordUpdateSchema = Joi.object({
  password: Joi.string().required().min(10).max(100),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    // Validate request body
    const schemaValidation = await passwordUpdateSchema.validateAsync(req.body);

    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(
      req.user._id,
      { password: hashedPassword },
      { new: true }
    );

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userSettingsUserActiveMessage.update_user_password_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
