import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { getFriendSendRequestMessage } from "../../../function/server-route-messages";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";

// Joi schema for response user friend request
const responseFriendRequestSchema = Joi.object({
  id: Joi.string(),
});

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        getFriendSendRequestMessage.user_required
      );
    }

    const { id } = req.body;

    // Validate request body
    const schemaValidation = await responseFriendRequestSchema.validateAsync(
      req.body
    );

    const userFriendRequest = await UserFriendAdd.find({
      _id: id,
      receiver: userProfileId,
      status: "pending",
    });

    if (!userFriendRequest) {
      return custom_server_response(res, 200, "user friend request not found");
    }

    await UserFriendAdd.findByIdAndDelete(id);

    return custom_server_response(res, 200, "response remove success");
  } catch (error) {
    return customServerError(res, error);
  }
};
