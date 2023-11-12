import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { userSettingsUserActiveMessage } from "../../../function/server-route-messages";
import { User } from "../../../models/user/user-model";
import bcrypt from "bcryptjs";
import Joi from "joi";

// Documentation
/**
 * @swagger
 * /api/user/settings/update_password:
 *   put:
 *     summary: Update user password
 *     description: Update the user's password.
 *     tags:
 *       - Settings
 *     security:
 *       - BearerAuth: string
 *     parameters:
 *       - in: body
 *         name: body
 *         description: The new password and confirmPassword.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               minLength: 10
 *               maxLength: 100
 *             confirmPassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Update user password successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
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
      userSettingsUserActiveMessage.update_user_password_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
