import { Response } from "express";
import userActiveModel, {
  UserActiveStatusEnum,
} from "../../models/user-active-model";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import { CustomRequest } from "../../middleware/user-authorization";
import {
  apiSuccessStatusMessage,
  userLogOutMessage,
} from "../../function/server-route-messages";

/**
 * @swagger
 * /api/user/auth/logout:
 *   put:
 *     summary: Log out a user
 *     description: Log out a user by providing an authentication token in the request headers.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication token. Use the format "Bearer jwt_token".
 *     responses:
 *       200:
 *         description: User log out successful.
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
 *               success: true
 *               message: "user log out success"
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
    let token: any = "";

    // Get token from header
    token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    await userActiveModel.findOneAndUpdate(
      {
        jwt: token,
        user_id: req.user._id,
      },
      { status: UserActiveStatusEnum.LogOut },
      { new: true }
    );

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      userLogOutMessage.user_log_out_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
