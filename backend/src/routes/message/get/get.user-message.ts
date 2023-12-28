import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { Message } from "../../../models/messages/message-model";

/* /**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get the user's messages.
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: string
 *     responses:
 *       200:
 *         description: Successful response with user's messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation.
 *                 message:
 *                   type: string
 *                   description: A message indicating the result.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.friendId; // Assuming friendId is sent in the request body

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by createdAt in ascending order

    return custom_server_response(
      res,
      200,
      "User messages fetched successfully",
      messages
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
