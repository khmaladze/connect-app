import express from "express";
import * as getUserActivelog from "./get/get.user-active-log";
import * as updateUserPassword from "./put/put.user-password-update";
import userAuthorization from "../../middleware/user-authorization";
let router = express.Router();

router.get("/active_log", userAuthorization, getUserActivelog.businessLogic);
router.put(
  "/update_password",
  userAuthorization,
  updateUserPassword.businessLogic
);

export default router;
