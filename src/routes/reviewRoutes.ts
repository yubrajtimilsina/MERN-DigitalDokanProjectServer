import express, { Router } from 'express';
import userMiddleware, { Role } from '../middleware/userMiddleware';
import errorHandler from '../services/errorHandler';
import reviewController from '../controllers/reviewController';

const router: Router = express.Router();

// Customer routes
router.route("/")
    .post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Customer), errorHandler(reviewController.addReview));

router.route("/my-reviews")
    .get(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Customer), errorHandler(reviewController.getUserReviews));

router.route("/:reviewId")
    .delete(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Customer), errorHandler(reviewController.deleteReview));

// Public routes
router.route("/product/:productId")
    .get(errorHandler(reviewController.getProductReviews));

// Admin routes
router.route("/admin/all")
    .get(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), errorHandler(reviewController.getAllReviews));

router.route("/admin/toggle/:reviewId")
    .patch(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), errorHandler(reviewController.toggleReviewVisibility));

export default router;