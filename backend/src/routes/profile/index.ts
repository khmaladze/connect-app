import express from "express";
import * as userProfileAdd from "./put/put.user-profile";
import * as userProfileImage from "./put/put.user-profileImage";
import userAuthorization from "../../middleware/user-authorization";
import * as userProfileDataGet from "./get/get.user-profile";
import * as userPost from "./post/post.user-post";
import * as userStory from "./post/post.user-story";
import * as getUserPost from "./get/get.user-post";
import * as getUserStory from "./get/get.user-story";
import * as deleteUserPost from "./post/post.post-delete";
import * as getPostLikesAndComments from "./get/get.post-statistic";
import * as deleteUserStory from "./post/post.story-delete";
import * as getStoryLikesAndComments from "./get/get.story-statistic";
import uploadImageToServer from "../../function/server-upload-image";
import uploadToServer from "../../function/server-upload-image-video";
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
  uploadToServer,
  userPost.businessLogic
);
router.post(
  "/add_story",
  userAuthorization,
  uploadToServer,
  userStory.businessLogic
);
router.get("/posts", userAuthorization, getUserPost.businessLogic);
router.get("/story", userAuthorization, getUserStory.businessLogic);
router.post("/post/:postId", userAuthorization, deleteUserPost.businessLogic);
router.post(
  "/story/:storyId",
  userAuthorization,
  deleteUserStory.businessLogic
);
router.get(
  "/post-like-comment/:postId",
  userAuthorization,
  getPostLikesAndComments.businessLogic
);
router.get(
  "/story-like-comment/:storyId",
  userAuthorization,
  getStoryLikesAndComments.businessLogic
);

export default router;
