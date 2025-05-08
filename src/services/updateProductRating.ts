import Review from "../Database/models/reviewModel";
import Product from "../Database/models/productModels";
import { Sequelize } from "sequelize-typescript";

/**
 * Updates a product's average rating and review count
 * @param productId The ID of the product to update
 */
const updateProductRating = async (productId: string): Promise<void> => {
    try {
        // Get the product
        const product = await Product.findByPk(productId);
        if (!product) {
            console.log(`Product with ID ${productId} not found`);
            return;
        }

        // Get all visible reviews for the product
        const reviews = await Review.findAll({
            where: {
                productId,
                isVisible: true
            },
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'reviewCount']
            ],
            raw: true
        });

        const result = reviews[0] as any;
        
        // Update the product
        product.averageRating = parseFloat(result.averageRating) || 0;
        product.reviewCount = parseInt(result.reviewCount) || 0;
        
        await product.save();
        
        console.log(`Updated product ${productId} ratings: average=${product.averageRating}, count=${product.reviewCount}`);
    } catch (error) {
        console.error("Error updating product rating:", error);
    }
};

export default updateProductRating;