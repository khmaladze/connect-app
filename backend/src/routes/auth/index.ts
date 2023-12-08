// Import the express module
import express from "express";

// Import various route handlers for registration, login, and logout
import * as register from "./post/post.register";
import * as login from "./post/post.login";
import * as logout from "./put/put.logout";

// Import the userAuthorization middleware
import userAuthorization from "../../middleware/user-authorization";

// Create an Express Router instance
let router = express.Router();

// Define routes and corresponding business logic
router.post("/register", register.businessLogic); // Route for user registration
router.post("/login", login.businessLogic); // Route for user login
router.put("/logout", userAuthorization, logout.businessLogic); // Protected route for user logout

// Export the router instance to be used by other parts of the application
export default router;
