import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import User from "./models/userModels";

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [User], // Explicitly add User model
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

sequelize.sync({ force: false }).then(() => {
    console.log("synced!!");
});

export default sequelize;