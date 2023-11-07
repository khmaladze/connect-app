import express from "express";
import * as getUserActivelog from "./get/get.user-active-log";
import * as updateUserPassword from "./put/put.user-password-update";
import userAuthorization from "../../middleware/user-authorization";
import userCheck from "../../middleware/user-check";
let router = express.Router();

router.get(
  "/active_log",
  userAuthorization,
  userCheck,
  getUserActivelog.businessLogic
);
router.put(
  "/update_password",
  userAuthorization,
  userCheck,
  updateUserPassword.businessLogic
);

export default router;
