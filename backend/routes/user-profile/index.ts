import express from "express";
import * as userProfileAdd from "./put.user-profile";
import * as userProfileImage from "./put.user-profileImage";
// import * as userProfileBackgroundImage from "./put.user-backgroundImage";
import userAuthorization from "../../middleware/user-authorization";
import * as userProfileDataGet from "./get.user-profile";
import * as userPost from "./post.user-post";
import uploadImageToServer from "../../function/server-upload-image";
import config from "../../config/config";
let router = express.Router();

export const routesUserProfile = config.backend_api.user.user_profile.index;

router.get(
  routesUserProfile.get_user_profile,
  userAuthorization,
  userProfileDataGet.businessLogic
);
router.put(
  routesUserProfile.update_user_profile_info_data,
  userAuthorization,
  userProfileAdd.businessLogic
);
router.put(
  routesUserProfile.update_profile_image,
  userAuthorization,
  uploadImageToServer,
  userProfileImage.businessLogic
);
// router.put(
//   routesUserProfile.update_profile_background_image,
//   userAuthorization,
//   uploadImageToServer,
//   userProfileBackgroundImage.businessLogic
// );
router.post(
  routesUserProfile.user_post,
  userAuthorization,
  uploadImageToServer,
  userPost.businessLogic
);

export default router;
