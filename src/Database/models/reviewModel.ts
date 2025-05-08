import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Product from "./productModels";

@Table({
    tableName: "reviews",
    modelName: "Review",
    timestamps: true
})
class Review extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    })
    declare rating: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    declare comment: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    declare isVisible: boolean;

    // ✅ Add this ForeignKey
    @ForeignKey(() => Product)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare productId: string;

    @BelongsTo(() => Product)
    declare product: Product;
}

export default Review;
