import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as sendFriendRequest from "./post/post.friend-request";
import * as getUserProfile from "./get/get.user-profile";
import * as getFriendRequest from "./get/get.friend-request";
import * as getSendRequest from "./get/get.send-request";
import * as responseFriendRequest from "./post/post.friend-request-response";
let router = express.Router();

router.post(
  "/send_friend_request",
  userAuthorization,
  sendFriendRequest.businessLogic
);
router.get("/user/:username", userAuthorization, getUserProfile.businessLogic);
router.get("/request", userAuthorization, getFriendRequest.businessLogic);
router.get(
  "/get_send_request",
  userAuthorization,
  getSendRequest.businessLogic
);
router.put("/response", userAuthorization, responseFriendRequest.businessLogic);

export default router;
