import {Table,Column,Model,DataType, AllowNull, Default} from 'sequelize-typescript'


@Table({
    tableName : "products", 
    modelName : "Product", 
    timestamps : true
})

class Product extends Model{
    @Column({
        primaryKey : true, 
        type : DataType.UUID, 
        defaultValue : DataType.UUIDV4
    })
    declare id:string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    declare productName:string

    @Column({
        type : DataType.TEXT,
        allowNull : false
    })
    declare productDescription:string

    @Column({
        type : DataType.FLOAT,
        allowNull : false
    })
    declare productPrice:number

    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    declare productTotalStock:number

    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    declare discount:number

    @Column({
        type : DataType.STRING
    })
    declare productImgUrl:string

    @Column({
        type: DataType.FLOAT,
        defaultValue: 0
    })
    declare averageRating: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    declare reviewCount: number
}

export default Product