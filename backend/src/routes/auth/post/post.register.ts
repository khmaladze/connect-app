import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { User } from "../../../models/user/user-model";
import { UserFriend } from "../../../models/friend/friend-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import {
  getZodiacSign,
  isValidDate,
} from "../../../function/server-user-profile";
import { UserProfile } from "../../../models/user/user-profile-model";

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
 *           example: john.doe@gmail.com
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
 *           example: aA!1234567
 *         confirmPassword:
 *           type: string
 *           description: The confirmation of the user's password.
 *           example: aA!1234567
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
  firstname: Joi.string().trim().lowercase().required().min(2).max(20),
  lastname: Joi.string().trim().lowercase().required().min(2).max(20),
  username: Joi.string().trim().lowercase().required().min(2).max(20),
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
  password: Joi.string()
    .required()
    .min(10)
    .max(100)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&\\*])(?=.{10,})"
      )
    )
    .message(
      "must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 10 characters long"
    ),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

const routeMessage = {
  user_email_exist: "Email already exists. Try another email.",
  user_username_exist: "Username already exists. Try another username.",
  user_not_valid_date: "Invalid date provided.",
  auth_user_register: "User registration success.",
};

export const businessLogic = async (req: Request, res: Response) => {
  try {
    // Validate request body
    await registrationSchema.validateAsync(req.body);

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
      return custom_server_response(res, 400, routeMessage.user_email_exist);
    }

    // Check if the username already exists in the database
    const usernameExists = await User.exists({ username });
    if (usernameExists) {
      return custom_server_response(res, 400, routeMessage.user_username_exist);
    }

    // Validate year, month, day
    if (!isValidDate(birthYear, birthMonth, birthDay)) {
      return custom_server_response(res, 400, routeMessage.user_not_valid_date);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
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

    // Create user profile and friend record
    await UserProfile.create({
      user_profile_id: user._id,
      zodiac: getZodiacSign(Number(birthMonth), Number(birthDay)).toLowerCase(),
    });

    await UserFriend.create({ user_profile_id: user._id });

    return custom_server_response(res, 200, routeMessage.auth_user_register);
  } catch (error) {
    // Handle any unexpected errors
    return customServerError(res, error);
  }
};
