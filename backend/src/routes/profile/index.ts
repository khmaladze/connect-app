import express from "express";
import * as userProfileAdd from "./put/put.user-profile";
import * as userProfileImage from "./put/put.user-profileImage";
import userAuthorization from "../../middleware/user-authorization";
import * as userProfileDataGet from "./get/get.user-profile";
import * as userPost from "./post/post.user-post";
import * as getUserPost from "./get/get.user-post";
import uploadImageToServer from "../../function/server-upload-image";
import userCheck from "../../middleware/user-check";
let router = express.Router();

router.get("/", userAuthorization, userCheck, userProfileDataGet.businessLogic);
router.put(
  "/profile_info_data",
  userAuthorization,
  userCheck,
  userProfileAdd.businessLogic
);
router.put(
  "/update_profile_image",
  userAuthorization,
  userCheck,
  uploadImageToServer,
  userProfileImage.businessLogic
);
router.post(
  "/add_post",
  userAuthorization,
  userCheck,
  uploadImageToServer,
  userPost.businessLogic
);
router.get("/posts", userAuthorization, userCheck, getUserPost.businessLogic);

export default router;
