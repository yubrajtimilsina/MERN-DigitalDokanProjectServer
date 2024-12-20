
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
    declare id : string

    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })

    declare quantity : number
}

export default Cart
