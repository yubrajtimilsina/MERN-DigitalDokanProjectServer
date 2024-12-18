
import { Table,Column,Model, PrimaryKey, DataType } from 'sequelize-typescript'

@Table({
    tableName : "carts",
    modelName : "Cart",
    timestamps :true
})

class Cart extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    @Column({
        type : DataType.INTEGER,
        allowNull : true
    })

    declare quality : Number
}

export default Cart
