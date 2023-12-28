import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import { Message } from "../../../models/messages/message-model";

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a new message.
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver:
 *                 type: string
 *                 description: The ID of the message receiver (user).
 *               message:
 *                 type: string
 *                 description: The content of the message.
 *     responses:
 *       200:
 *         description: Message sent successfully.
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
 *                   $ref: '#/components/schemas/Message'
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
    const { receiver, message } = req.body;
    const sender = req.user._id;

    const newMessage = await Message.create({ sender, receiver, message });

    return custom_server_response(
      res,
      200,
      "Message sent successfully",
      newMessage
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
