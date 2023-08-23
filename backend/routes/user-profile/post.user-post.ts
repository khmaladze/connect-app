import { Response } from "express";
import { customServerError } from "../../function/server-custom-error-response";
import { custom_server_response } from "../../function/server-response";
import {
  userProfileMessage,
  apiSuccessStatusMessage,
} from "../../function/server-route-messages";
import { CustomRequest } from "../../middleware/user-authorization";
import { uploadImageToCloudinary } from "../../function/server-upload-image";
import Joi from "joi";
import { Post } from "../../models/post-model";

const postSchema = Joi.object({
  text: Joi.string().max(500),
}).options({ abortEarly: false });

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    if (!userProfileId) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        userProfileMessage.user_required
      );
    }

    // Validate request body
    const schemaValidation = await postSchema.validateAsync(req.body);

    const file = req.file;
    const text = req.body.text;

    if (!text && !file) {
      return custom_server_response(
        res,
        400,
        apiSuccessStatusMessage.no_success,
        "add text or media. minimum one field required"
      );
    }

    let createData: any = { author: req.user };

    if (text) {
      createData.text = text;
    }

    if (file) {
      // Upload the image to Cloudinary in the specified folder
      const imageUrl = await uploadImageToCloudinary(
        String(userProfileId),
        file
      );
      createData.media = { url: imageUrl };
    }

    const newData = await Post.create(createData);

    return custom_server_response(
      res,
      200,
      apiSuccessStatusMessage.success,
      "create",
      newData
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
