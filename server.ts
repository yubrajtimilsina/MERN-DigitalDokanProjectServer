import app from "./src/app";
import sequelize from "./src/Database/connection";

import {envConfig } from "./src/config/config"
import { config } from "dotenv"

function startServer(){
    const port = envConfig.port || 4000
    app.listen(envConfig.port, () => {

    console.log('Server has started at port[${port}]')
})
}

startServer()