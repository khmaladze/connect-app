import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { User } from "../../../models/user/user-model";
import userActiveModel from "../../../models/user/user-active-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { loginUserMessage } from "../../../function/server-route-messages";
import config from "../../../../../config/config";
import { getDateAfter7Days } from "../../../function/server-user-profile";

// Documentation
/**
 * @swagger
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
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *             user:
 *               $ref: '#/components/schemas/LoginResponseUser'
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *
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
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseData'
 *       400:
 *         description: Bad request or incorrect email/password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseData'
 */

const MIN_PASSWORD_LENGTH = 10;

// Joi schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(MIN_PASSWORD_LENGTH).required(),
});

export const businessLogic = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    await loginSchema.validateAsync({ email, password });

    // Find the user by email
    const user: any = await User.findOne({ email });
    if (!user) {
      return custom_server_response(res, 400, loginUserMessage.incorrect_email);
    }

    // Compare the provided password with the hashed password stored in the user record
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return custom_server_response(
        res,
        400,
        loginUserMessage.incorrect_password
      );
    }

    // Generate a JWT and send it back to the client
    const token = jwt.sign({ id: user._id }, config.jwt_token, {
      expiresIn: "7d",
    });

    // Hide password for user
    user.password = undefined;

    // Calculate JWT expiration date
    const user_jwt_expires = await getDateAfter7Days();

    // Create a new userActiveModel
    await userActiveModel.create({
      jwt: token,
      user_id: user._id,
      expires: user_jwt_expires,
    });

    return custom_server_response(res, 200, loginUserMessage.auth_user_login, {
      token,
      user,
    });
  } catch (error) {
    return customServerError(res, error);
  }
};
