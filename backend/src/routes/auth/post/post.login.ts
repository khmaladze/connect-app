import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { User } from "../../../models/user/user-model";
import userActiveModel from "../../../models/user/user-active-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import config from "../../../../../config/config";
import { getDateAfter7Days } from "../../../function/server-user-profile";

// Minimum password length required
const MIN_PASSWORD_LENGTH = 10;

// Joi schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(MIN_PASSWORD_LENGTH).required(),
});

// Messages for different scenarios
const routeMessage = {
  incorrect_email: "Email not found. Incorrect email.",
  incorrect_password: "Incorrect password.",
  auth_user_login: "User login success.",
};

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  gender: string;
  profileImage: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  password: any;
  profileImagePublicId: any;
}

/**
 * Handles user login.
 * @swagger
 * /api/user/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Log in a user by providing email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 10
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: User login success.
 *                 data:
 *                   $ref: '#/components/schemas/LoginResponseUser'
 *       400:
 *         description: Bad request or incorrect email/password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   default: false
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/LoginResponseUser'
 *
 * components:
 *   schemas:
 *     LoginResponseUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         username:
 *           type: string
 *         gender:
 *           type: string
 *         profileImage:
 *           type: string
 *         birthDay:
 *           type: number
 *         birthMonth:
 *           type: number
 *         birthYear:
 *           type: number
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 *     LoginResponseData:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/LoginResponseUser'
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 10
 */
export const businessLogic = async (req: Request, res: Response) => {
  try {
    // Request body
    const { email, password } = req.body;

    // Validate request body
    await loginSchema.validateAsync({ email, password });

    // Find the user by email
    const user: User | null = await User.findOne({ email });

    // If user not found, return an error response
    if (!user) {
      return custom_server_response(res, 400, routeMessage.incorrect_email);
    }

    // Compare the provided password with the hashed password stored in the user record
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error response
    if (!passwordsMatch) {
      return custom_server_response(res, 400, routeMessage.incorrect_password);
    }

    // Generate a JWT and send it back to the client
    const token = jwt.sign({ id: user._id }, config.jwt_token, {
      expiresIn: "7d",
    });

    // Hide password and profileImagePublicId for user
    user.password = undefined;
    user.profileImagePublicId = undefined;

    // Calculate JWT expiration date
    const userJwtExpires = await getDateAfter7Days();

    // Create a new userActiveModel
    await userActiveModel.create({
      jwt: token,
      user_id: user._id,
      expires: userJwtExpires,
    });

    // Return a success response with token and user information
    return custom_server_response(res, 200, routeMessage.auth_user_login, {
      token,
      user,
    });
  } catch (error) {
    // Handle any unexpected errors
    return customServerError(res, error);
  }
};
