import express from "express";
import * as userProfileAdd from "./put/put.user-profile";
import * as userProfileImage from "./put/put.user-profileImage";
import userAuthorization from "../../middleware/user-authorization";
import * as userProfileDataGet from "./get/get.user-profile";
import * as userPost from "./post/post.user-post";
import * as getUserPost from "./get/get.user-post";
import * as deleteUserPost from "./post/post.post-delete";
import * as getPostLikesAndComments from "./get/get.post-statistic";
import uploadImageToServer from "../../function/server-upload-image";
let router = express.Router();

router.get("/", userAuthorization, userProfileDataGet.businessLogic);
router.put(
  "/profile_info_data",
  userAuthorization,
  userProfileAdd.businessLogic
);
router.put(
  "/update_profile_image",
  userAuthorization,
  uploadImageToServer,
  userProfileImage.businessLogic
);
router.post(
  "/add_post",
  userAuthorization,
  uploadImageToServer,
  userPost.businessLogic
);
router.get("/posts", userAuthorization, getUserPost.businessLogic);
router.post("/post/:postId", userAuthorization, deleteUserPost.businessLogic);
router.get(
  "/post-like-comment/:postId",
  userAuthorization,
  getPostLikesAndComments.businessLogic
);

export default router;
