import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { User } from "../../models/user/user-model";
import { UserFriend } from "../../models/friend/friend-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import { registerUserMessage } from "../../function/server-route-messages";
import { getZodiacSign, isValidDate } from "../../function/server-user-profile";
import { UserProfile } from "../../models/user/user-profile-model";

// Documentation
/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The user's first name.
 *           example: John
 *         lastname:
 *           type: string
 *           description: The user's last name.
 *           example: Doe
 *         username:
 *           type: string
 *           description: The user's username.
 *           example: johndoe
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *           example: john.doe@example.com
 *         gender:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *             - other
 *           description: The user's gender.
 *           example: male
 *         birthDay:
 *           type: number
 *           description: The day of the user's birth.
 *           example: 1
 *         birthMonth:
 *           type: number
 *           description: The month of the user's birth.
 *           example: 1
 *         birthYear:
 *           type: number
 *           description: The year of the user's birth.
 *           example: 2000
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: 1234567890
 *         confirmPassword:
 *           type: string
 *           description: The confirmation of the user's password.
 *           example: 1234567890
 *
 * @swagger
 * /api/user/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       200:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUser'
 *       400:
 *         description: Bad request or user already exists.
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
 *               message: "Error message here"
 *     tags:
 *       - Auth
 */

// Joi schema for user registration
const registrationSchema = Joi.object({
  firstname: Joi.string().trim().lowercase().required().min(2).max(50),
  lastname: Joi.string().trim().lowercase().required().min(2).max(50),
  username: Joi.string().trim().lowercase().required().min(2).max(50),
  gender: Joi.string().valid("male", "female", "other").lowercase().required(),
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
    // Validate request body
    const schemaValidation = await registrationSchema.validateAsync(req.body);

    // Get data from request body
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
    const emailExists = await User.exists({ email });
    if (emailExists) {
      return custom_server_response(
        res,
        400,
        registerUserMessage.user_email_exist
      );
    }

    // Check if the username already exists in the database
    const usernameExists = await User.exists({ username });
    if (usernameExists) {
      return custom_server_response(
        res,
        400,
        registerUserMessage.user_username_exist
      );
    }

    // Validate year, month, day
    if (!isValidDate(birthYear, birthMonth, birthDay)) {
      return custom_server_response(
        res,
        400,
        registerUserMessage.user_not_valid_date
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      username,
      gender,
      birthDay,
      birthMonth,
      birthYear,
      email,
      password: hashedPassword,
    });

    await UserProfile.create({
      user_profile_id: user._id,
      zodiac: getZodiacSign(Number(birthMonth), Number(birthDay)).toLowerCase(),
    });

    await UserFriend.create({ user_profile_id: user._id });

    return custom_server_response(
      res,
      200,
      registerUserMessage.auth_user_register
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
