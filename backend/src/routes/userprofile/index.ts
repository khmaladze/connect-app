import express from "express";
import userAuthorization from "../../middleware/user-authorization";
import * as userProfileDataGet from "./get/get.user-profile";
let router = express.Router();

router.get("/:profileId", userAuthorization, userProfileDataGet.businessLogic);

export default router;
