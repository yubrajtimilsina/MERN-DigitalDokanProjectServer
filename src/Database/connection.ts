import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import User from "./models/userModels";
import Product from "./models/productModels";
import Category from "./models/categoryModel";
import Order from "./models/orderModel";
import Payment from "./models/paymentModel";
import OrderDetails from "./models/orderDetail";
import Cart from "./models/cartModel";

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [__dirname + '/models'], // Explicitly add User model
});

try {
    sequelize.authenticate()
        .then(() => {
            console.log("milyo haii authentication so ma connect vaya !!!");
        })
        .catch(err => {
            console.log("error aayo", err);
        });
} catch (error) {
    console.log(error);
}

sequelize.sync({ force: false ,alter:false }).then(() => {
    console.log("synced!!");
});


//relationship 

Product .belongsTo(Category,{foreignKey : 'categoryId'})
Category.hasOne(Product,{foreignKey : 'categoryId'})

//User X orders
User.hasMany(Order,{foreignKey:'userId'})
Order.belongsTo(User,{foreignKey:'userId'})

// Payment X Order 
Payment.hasOne(Order,{foreignKey:'paymentId'})
Order.belongsTo(Payment,{foreignKey:'paymentId'})

Order.hasOne(OrderDetails,{foreignKey:'orderId'})
OrderDetails.belongsTo(Order,{foreignKey:'orderId'})

Product.hasMany(OrderDetails,{foreignKey:'productId'})
OrderDetails.belongsTo(Product,{foreignKey:'productId'})

//Cart -user
Cart.belongsTo(User,{foreignKey:"userId"})
User.hasOne(Cart,{foreignKey:"userId"})

//cart  -Product

Cart.belongsTo(Product,{foreignKey:"productId"})
Product.hasMany(Cart, {foreignKey:"productId"})


export default sequelize;