import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as sendFriendRequest from "./post/post.friend-request";
import * as getUserProfile from "./get/get.user-profile";
import * as getFriendRequest from "./get/get.friend-request";
import * as getSendRequest from "./get/get.send-request";
import * as getFriendList from "./get/get.friendList";
import * as responseFriendRequest from "./put/put.friend-request-response";
import * as removeSentFriendRequest from "./put/put.remove-friend-request";
import * as removeUserFromFriendList from "./put/put.remove-friendList";
import * as updateFriendList from "./put/put.update-friend-list";
let router = express.Router();

router.post(
  "/send_friend_request",
  userAuthorization,
  sendFriendRequest.businessLogic
);
router.get("/user/:username", userAuthorization, getUserProfile.businessLogic);
router.get("/", userAuthorization, getFriendList.businessLogic);
router.get("/request", userAuthorization, getFriendRequest.businessLogic);
router.get(
  "/get_send_request",
  userAuthorization,
  getSendRequest.businessLogic
);
router.put("/response", userAuthorization, responseFriendRequest.businessLogic);
router.put(
  "/remove_request",
  userAuthorization,
  removeSentFriendRequest.businessLogic
);
router.put(
  "/remove",
  userAuthorization,
  removeUserFromFriendList.businessLogic
);
router.put(
  "/update-friend-list",
  userAuthorization,
  updateFriendList.businessLogic
);

export default router;
