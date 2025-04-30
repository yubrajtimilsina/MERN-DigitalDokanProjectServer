import Express, { Router }  from "express";
import UserController from "../controllers/userController";
import errorHandler from "../services/errorHandler";
import userMiddleware, { Role } from "../middleware/userMiddleware";

const router:Router = Express.Router()

router.route("/register").post(errorHandler(UserController.register))
router.route("/login").post(errorHandler(UserController.login))
router.route("/forgot-password").post(errorHandler(UserController.handleForgotPassword))
router.route("/verify-otp").post(errorHandler(UserController.verifyOtp))
router.route("/reset-password").post(errorHandler(UserController.resetPassword))

router.route("/users").get(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), errorHandler( UserController.fetchUsers))
router.route("/users/:id").delete(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), errorHandler( UserController.deleteUser))
export default router