import Express, { Router }  from "express";
import UserController from "../controllers/userController";
import errorHandler from "../services/errorHandler";

const router:Router = Express.Router()

router.route("/register").post(errorHandler(UserController.register))
router.route("/login").post(errorHandler(UserController.login))
router.route("/forgot-password").post(errorHandler(UserController.handleForgotPassword))
router.route("/verify-otp").post(errorHandler(UserController.verifyOtp))
router.route("/reset-password").post(errorHandler(UserController.resetPassword))
export default router