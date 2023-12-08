import { Response } from "express";
import userActiveModel, {
  UserActiveStatusEnum,
} from "../../../models/user/user-active-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";

// Documentation
/**
 * @swagger
 * /api/user/auth/logout:
 *   put:
 *     summary: Log out a user
 *     description: Log out a user by providing an authentication token in the request headers.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User log out successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       401:
 *         description: Unauthorized or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

const routeMessage = {
  user_log_out_success: "User log out success.",
};

/**
 * Handles user logout.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response indicating the success or failure of the user logout.
 */
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    let token: any = "";

    // Get token from header
    token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // Update user's token status to "LogOut"
    await userActiveModel.findOneAndUpdate(
      {
        jwt: token,
        user_id: req.user._id,
      },
      { status: UserActiveStatusEnum.LogOut },
      { new: true }
    );

    return custom_server_response(res, 200, routeMessage.user_log_out_success);
  } catch (error) {
    return customServerError(res, error);
  }
};
