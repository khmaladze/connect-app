import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as postUserLike from "./post/post.user-post-like";
import * as getPostUserLike from "./get/get.user-post-liked";
import * as removeUserPostLike from "./post/post.remove-post-like";
import * as addComment from "./post/post.post-comment";
import * as getComment from "./get/get.user-post-comment";
import * as deleteUserPostComment from "./post/post.post-delete-comment";
let router = express.Router();

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
router.get("/comment", userAuthorization, getComment.businessLogic);
router.post(
  "/comment/:postId",
  userAuthorization,
  deleteUserPostComment.businessLogic
);


export default router;
