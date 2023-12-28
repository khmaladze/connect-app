import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { UserFriend } from "../../../models/friend/friend-model";
import { User } from "../../../models/user/user-model";

/**
 * @swagger
 * /api/user/friend:
 *   get:
 *     summary: Retrieve pending friend requests.
 *     description: Get a list of pending friend requests.
 *     tags:
 *       - Friend
 *     responses:
 *       '200':
 *         description: Successful request response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the request.
 *                 message:
 *                   type: string
 *                   description: Success message related to the request.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       friend_list:
 *                         type: string
 *                         description: Type of friend list.
 *                       user_id:
 *                         type: string
 *                         description: User ID.
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the request.
 *                       friends_from:
 *                         type: string
 *                         description: Date and time when the request was made.
 *                         format: date-time
 *     security:
 *       - BearerAuth: []
 */

const routeMessage = {
  get_friend_chat_success: "get friend chat success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userDetail = await User.findOne({
      _id: req.params.friendId,
    }).select("_id username gender profileImage");

    return custom_server_response(
      res,
      200,
      routeMessage.get_friend_chat_success,
      userDetail
    );
  } catch (error) {
    return customServerError(res, error);
  }
};