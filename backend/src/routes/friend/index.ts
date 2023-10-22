import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as sendFriendRequest from "./post.friend-request";
let router = express.Router();

router.post(
  "/send_friend_request",
  userAuthorization,
  sendFriendRequest.businessLogic
);

export default router;
