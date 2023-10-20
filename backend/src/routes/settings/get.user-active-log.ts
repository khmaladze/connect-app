import { Response } from "express";
import userActiveModel from "../../models/user-active-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import { CustomRequest } from "../../middleware/user-authorization";
import {
  apiSuccessStatusMessage,
  userSettingsUserActiveMessage,
} from "../../function/server-route-messages";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *       example:
 *         _id: "65273876277bed2db0be853a"
 *         firstname: "testman"
 *         lastname: "test"
 *         username: "testman"
 *         gender: "male"
 *         profileImage: "string"
 *         birthDay: 1
 *         birthMonth: 1
 *         birthYear: 2010
 *         email: "email@gmail.com"
 *         createdAt: "2023-10-12T00:06:14.689Z"
 *         updatedAt: "2023-10-14T22:36:25.140Z"
 *         __v: 0
 *
 *     UserActive:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         jwt:
 *           type: string
 *         status:
 *           type: string
 *         user_id:
 *           type: string
 *         expires:
 *           type: string
 *       example:
 *         _id: "6530b0631695b00c60ae2f16"
 *         jwt: "your_jwt_token"
 *         status: "Active"
 *         user_id: "652f7a87c2f8f7bca68ab704"
 *         expires: "2023-10-26T04:28:19.455Z"
 */

/**
 * @swagger
 * /api/user/settings/active_log:
 *   get:
 *     summary: Get user active log
 *     description: Get the active log for the user.
 *     tags:
 *       - Settings
 *     security:
 *       - BearerAuth: string
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication token. Use the format "Bearer jwt_token".
 *     responses:
 *       200:
 *         description: Get user active log successful.
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserActive'
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

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userActiveData = await userActiveModel
      .find({
        user_id: req.user._id,
      })
      .sort("-createdAt")
      .select("-jwt");

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userSettingsUserActiveMessage.get_user_log_success,
      userActiveData
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
