import { Response } from "express";
import { UserFriendAdd } from "../../../models/friend/friend-send-request-model";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { userFriendRequstRemoveMessage } from "../../../function/server-route-messages";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";

// Joi schema for response user friend request
const responseFriendRequestSchema = Joi.object({
  id: Joi.string(),
});

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
          userFriendRequstRemoveMessage.user_already_respond
        );
      }
    }

    if (userFriendRequest[0].status == "pending") {
      await UserFriendAdd.findByIdAndDelete(id);
    }

    return custom_server_response(
      res,
      200,
      userFriendRequstRemoveMessage.response_remove_success
    );
  } catch (error) {
    return customServerError(res, error);
  }
};
