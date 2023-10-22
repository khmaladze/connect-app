import express from "express";
import * as userProfileAdd from "./put.user-profile";
import * as userProfileImage from "./put.user-profileImage";
// import * as userProfileBackgroundImage from "./put.user-backgroundImage";
import userAuthorization from "../../middleware/user-authorization";
import * as userProfileDataGet from "./get.user-profile";
import * as userPost from "./post.user-post";
import * as getUserPost from "./get.user-post";
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

export default router;
