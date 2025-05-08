import { Request, Response } from "express";
import Review from "../Database/models/reviewModel";
import Product from "../Database/models/productModels";
import User from "../Database/models/userModels";
import updateProductRating from "../services/updateProductRating";

interface AuthRequest extends Request {
    user?: {
        id: string
    }
}

class ReviewController {
    async addReview(req: AuthRequest, res: Response) {
        const userId = req.user?.id;
        const { productId, rating, comment } = req.body;

        // Validate input
        if (!productId || !rating) {
            res.status(400).json({
                message: "Please provide productId and rating"
            });
            return;
        }

        // Check if rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
            return;
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }

        // Check if user has already reviewed this product
        const existingReview = await Review.findOne({
            where: {
                userId,
                productId
            }
        });

        if (existingReview) {
            // Update existing review
            existingReview.rating = rating;
            existingReview.comment = comment || existingReview.comment;
            await existingReview.save();
            
            // Update product's average rating
            await updateProductRating(productId);

            res.status(200).json({
                message: "Review updated successfully",
                data: existingReview
            });
        } else {
            // Create new review
            const newReview = await Review.create({
                userId,
                productId,
                rating,
                comment: comment || ""
            });
            
            // Update product's average rating
            await updateProductRating(productId);

            res.status(201).json({
                message: "Review added successfully",
                data: newReview
            });
        }
    }

    async getProductReviews(req: Request, res: Response) {
        const { productId } = req.params;

        if (!productId) {
            res.status(400).json({
                message: "Please provide productId"
            });
            return;
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }

        // Get all visible reviews for the product
        const reviews = await Review.findAll({
            where: {
                productId,
                isVisible: true
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        // Calculate average rating
        let totalRating = 0;
        reviews.forEach(review => {
            totalRating += review.rating;
        });
        const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0";

        res.status(200).json({
            message: "Reviews fetched successfully",
            data: {
                reviews,
                averageRating,
                totalReviews: reviews.length
            }
        });
    }

    async getUserReviews(req: AuthRequest, res: Response) {
        const userId = req.user?.id;

        const reviews = await Review.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'productName', 'productImgUrl']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: "User reviews fetched successfully",
            data: reviews
        });
    }

    async deleteReview(req: AuthRequest, res: Response) {
        const userId = req.user?.id;
        const { reviewId } = req.params;

        const review = await Review.findOne({
            where: {
                id: reviewId,
                userId
            }
        });

        if (!review) {
            res.status(404).json({
                message: "Review not found or you don't have permission to delete it"
            });
            return;
        }

        const productId = review.productId;
        await review.destroy();
        
        // Update product's average rating
        await updateProductRating(productId);
        
        res.status(200).json({
            message: "Review deleted successfully"
        });
    }

    // Admin functions
    async getAllReviews(req: Request, res: Response) {
        const reviews = await Review.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Product,
                    attributes: ['id', 'productName']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: "All reviews fetched successfully",
            data: reviews
        });
    }

    async toggleReviewVisibility(req: Request, res: Response) {
        const { reviewId } = req.params;
        const review = await Review.findByPk(reviewId);

        if (!review) {
            res.status(404).json({
                message: "Review not found"
            });
            return;
        }

        review.isVisible = !review.isVisible;
        await review.save();
        
        // Update product's average rating since visibility changed
        await updateProductRating(review.productId);

        res.status(200).json({
            message: `Review ${review.isVisible ? 'visible' : 'hidden'} successfully`,
            data: review
        });
    }
}

export default new ReviewController();