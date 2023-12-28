import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as sendMessage from "./post/post.send-message";
import * as getMessage from "./get/get.user-message";
import * as getUser from "./get/get.user";
let router = express.Router();

router.post("/", userAuthorization, sendMessage.businessLogic);
router.get("/:friendId", userAuthorization, getMessage.businessLogic);
router.get("/user/:friendId", userAuthorization, getUser.businessLogic);

export default router;
