import { Response } from "express";
import { customServerError } from "../../../function/server-custom-error-response";
import { custom_server_response } from "../../../function/server-response";
import { CustomRequest } from "../../../middleware/user-authorization";
import Joi from "joi";
import { PostLike } from "../../../models/post-like/post-like-model";

// Documentation

// validation
const postLikeSchema = Joi.object({
  post_id: Joi.string().required(),
});

// route message
const routeMessage = {
  like_already_exists: "like already exists",
  post_like_success: "post like success",
};

export const businessLogic = async (req: CustomRequest, res: Response) => {
  try {
    const userProfileId: number = req.user._id;

    // Validate request body
    const schemaValidation = await postLikeSchema.validateAsync(req.body);

    const { post_id } = req.body;

    const isLikeAlreadyExists = await PostLike.exists({
      post_id: post_id,
      like_author_id: userProfileId,
    });

    if (isLikeAlreadyExists) {
      return custom_server_response(res, 400, routeMessage.like_already_exists);
    }

    const newData = await PostLike.create({
      post_id: post_id,
      like_author_id: userProfileId,
    });

    return custom_server_response(
      res,
      200,
      routeMessage.post_like_success,
      newData
    );
  } catch (error) {
    return customServerError(res, error, req);
  }
};
