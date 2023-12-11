import express from "express";
import * as userProfileAdd from "./put/put.user-profile";
import * as userProfileImage from "./put/put.user-profileImage";
import userAuthorization from "../../middleware/user-authorization";
import * as userProfileDataGet from "./get/get.user-profile";
import * as userPost from "./post/post.user-post";
import * as getUserPost from "./get/get.user-post";
import * as postUserLike from "./post/post.user-post-like";
import * as getPostUserLike from "./get/get.user-post-liked";
import * as removeUserPostLike from "./post/post.remove-post-like";
import * as addComment from "./post/post.post-comment";
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
router.post("/like_post", userAuthorization, postUserLike.businessLogic);
router.get(
  "/check_post_like/:postId",
  userAuthorization,
  getPostUserLike.businessLogic
);
router.post(
  "/remove_post_like",
  userAuthorization,
  removeUserPostLike.businessLogic
);
router.post("/comment", userAuthorization, addComment.businessLogic);

export default router;
