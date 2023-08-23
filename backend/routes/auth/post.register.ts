import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { User } from "../../models/user-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  apiSuccessStatusMessage,
  registerUserMessage,
} from "../../function/server-route-messages";
import { getZodiacSign, isValidDate } from "../../function/server-user-profile";
import { UserProfile } from "../../models/user-profile-model";

// Joi schema for user registration
const registrationSchema = Joi.object({
  firstname: Joi.string().trim().lowercase().required().min(2).max(50),
  lastname: Joi.string().trim().lowercase().required().min(2).max(50),
  username: Joi.string().trim().lowercase().required().min(2).max(50),
  gender: Joi.string()
    .trim()
    .valid("male", "female", "other")
    .lowercase()
    .required(),
  birthDay: Joi.number().required().min(1).max(31),
  birthMonth: Joi.number().required().min(1).max(12),
  birthYear: Joi.number().required().min(1900).max(new Date().getFullYear()),
  email: Joi.string()
    .email({
      tlds: { allow: ["com"] },
      minDomainSegments: 2,
    })
    .regex(/@(gmail|yahoo|outlook)\.com$/)
    .trim()
    .lowercase()
    .required(),
  password: Joi.string().required().min(10).max(100),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    // validate request body
    const schemaValidation = await registrationSchema.validateAsync(req.body);

    // get data from request body
    const {
      firstname,
      lastname,
      username,
      email,
      gender,
      birthDay,
      birthMonth,
      birthYear,
      password,
    } = req.body;

    // Check if the email already exists in the database
    const emailExists = await User.exists({ email: email });
    if (emailExists) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        registerUserMessage.user_email_exist
      );
    }

    // Check if the username already exists in the database
    const usernameExists = await User.exists({ username: username });
    if (usernameExists) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        registerUserMessage.user_username_exist
      );
    }

    // validate year month day
    if (isValidDate(birthYear, birthMonth, birthDay) == false) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        registerUserMessage.user_not_valid_date
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      gender: gender,
      birthDay: birthDay,
      birthMonth: birthMonth,
      birthYear: birthYear,
      email: email,
      password: hashedPassword,
    });

    await UserProfile.create({
      user_profile_id: user._id,
      zodiac: getZodiacSign(Number(birthMonth), Number(birthDay)).toLowerCase(),
    });

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      registerUserMessage.auth_user_register
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
