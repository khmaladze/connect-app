import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";

/**
 * @swagger
 * /api/user/friend/remove_request:
 *   put:
 *     summary: Remove a friend request
 *     tags:
 *       - Friend
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *           required:
 *             - id
 *     responses:
 *       200:
 *         description: Friend request removed successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Friend request not found
 *       409:
 *         description: User has already responded to the request
 *     security:
 *       - BearerAuth: []
 */

// Joi schema for response user friend request
const responseFriendRequestSchema = Joi.object({
  id: Joi.string(),
});

const routeMessage = {
  user_already_respond: "user already respond",
  request_remove_success: "friend request remove success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    const { id } = req.body;

    // Validate request body
    const schemaValidation = await responseFriendRequestSchema.validateAsync(
      req.body
    );

    const userFriendRequest = await UserFriendAdd.find({
      _id: id,
      sender: userProfileId,
    });

    if (userFriendRequest) {
      if (
        userFriendRequest[0].status == "accepted" ||
        userFriendRequest[0].status == "rejected"
      ) {
        return custom_server_response(
          res,
          200,
          routeMessage.user_already_respond
        );
      }
    }

    if (userFriendRequest[0].status == "pending") {
      await UserFriendAdd.findByIdAndDelete(id);
    }

    return custom_server_response(
      res,
      200,
      routeMessage.request_remove_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
