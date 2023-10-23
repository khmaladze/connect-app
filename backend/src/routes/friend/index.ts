import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as sendFriendRequest from "./post.friend-request";
import * as getUserProfile from "./get.user-profile";
let router = express.Router();

router.post(
  "/send_friend_request",
  userAuthorization,
  sendFriendRequest.businessLogic
);
router.get("/user/:username", userAuthorization, getUserProfile.businessLogic);

export default router;
