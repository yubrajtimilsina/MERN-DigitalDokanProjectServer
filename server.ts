import app from "./src/app";
import sequelize from "./src/Database/connection";

import {envConfig } from "./src/config/config"
import { config } from "dotenv"
import adminSeeder from "./adminSeeder";
import categoryControllers from "./src/controllers/categoryControllers";

function startServer(){
    const port = envConfig.port || 4000
    app.listen(envConfig.port, () => {
        categoryControllers.seedCategory()
    console.log('Server has started at port[${port}]')
    adminSeeder()
})
}

startServer()