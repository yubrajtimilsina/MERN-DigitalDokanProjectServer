import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import User from "./models/userModels";
import Product from "./models/productModels";
import Category from "./models/categoryModel";

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

sequelize.sync({ force: false,alter:false }).then(() => {
    console.log("synced!!");
});


//relationship 

Product .belongsTo(Category,{foreignKey : 'categoryId'})
Category.hasOne(Product,{foreignKey : 'categoryId'})


export default sequelize;