import express from "express";
import * as getUserActivelog from "./get.user-active-log";
import * as updateUserPassword from "./put.user-password-update";
import userAuthorization from "../../middleware/user-authorization";
import config from "../../config/config";
let router = express.Router();

export const routesSettings = config.backend_api.user.user_settings.index;

router.get(
  routesSettings.user_active_log,
  userAuthorization,
  getUserActivelog.businessLogic
);
router.put(
  routesSettings.update_user_password,
  userAuthorization,
  updateUserPassword.businessLogic
);

export default router;
