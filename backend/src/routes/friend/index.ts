import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as sendFriendRequest from "./post/post.friend-request";
import * as getUserProfile from "./get/get.user-profile";
import * as getFriendRequest from "./get/get.friend-request";
import * as getSendRequest from "./get/get.send-request";
import * as responseFriendRequest from "./put/put.friend-request-response";
import * as removeSentFriendRequest from "./put/put.remove-friend-request";
import userCheck from "../../middleware/user-check";
let router = express.Router();

router.post(
  "/send_friend_request",
  userAuthorization,
  userCheck,
  sendFriendRequest.businessLogic
);
router.get(
  "/user/:username",
  userAuthorization,
  userCheck,
  getUserProfile.businessLogic
);
router.get(
  "/request",
  userAuthorization,
  userCheck,
  getFriendRequest.businessLogic
);
router.get(
  "/get_send_request",
  userAuthorization,
  userCheck,
  getSendRequest.businessLogic
);
router.put(
  "/response",
  userAuthorization,
  userCheck,
  responseFriendRequest.businessLogic
);
router.put(
  "/remove",
  userAuthorization,
  userCheck,
  removeSentFriendRequest.businessLogic
);

export default router;
