import express from "express";
import * as register from "./post/post.register";
import * as login from "./post/post.login";
import * as logout from "./put/put.logout";
import userAuthorization from "../../middleware/user-authorization";
let router = express.Router();

router.post("/register", register.businessLogic);
router.post("/login", login.businessLogic);
router.put("/logout", userAuthorization, logout.businessLogic);

export default router;
