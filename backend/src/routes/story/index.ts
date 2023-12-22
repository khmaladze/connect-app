import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as storieUserLike from "../story/post/post.user-story-like";
import * as storieUserStoryView from "../story/post/post.story-view";
import * as getStoryUserLike from "./get/get.user-story-liked";
import * as removeUserStoryLike from "./post/post.remove-story-like";
import * as addStoryComment from "./post/post.add-story-comment";
import * as getStoryComment from "./get/get.user-story-comment";
import * as deleteUserStoryComment from "./post/post.story-delete-comment";
import * as getUserFriendsStory from "./get/get.user-story";
let router = express.Router();

router.get("/", userAuthorization, getUserFriendsStory.businessLogic);
router.post("/like_story", userAuthorization, storieUserLike.businessLogic);
router.post(
  "/story_view",
  userAuthorization,
  storieUserStoryView.businessLogic
);
router.get(
  "/check_story_like/:storyId",
  userAuthorization,
  getStoryUserLike.businessLogic
);
router.post(
  "/remove_story_like",
  userAuthorization,
  removeUserStoryLike.businessLogic
);
router.post("/comment", userAuthorization, addStoryComment.businessLogic);
router.get("/comment", userAuthorization, getStoryComment.businessLogic);
router.post(
  "/comment/:storyId",
  userAuthorization,
  deleteUserStoryComment.businessLogic
);

export default router;
