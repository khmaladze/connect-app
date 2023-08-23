import express from "express";
import * as register from "./post.register";
import * as login from "./post.login";
import * as logout from "./put.logout";
import userAuthorization from "../../middleware/user-authorization";
import config from "../../config/config";
let router = express.Router();

export const routesAuth = config.backend_api.user.user_auth.index;

router.post(routesAuth.register, register.businessLogic);
router.post(routesAuth.login, login.businessLogic);
router.put(routesAuth.logout, userAuthorization, logout.businessLogic);

export default router;
