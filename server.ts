import app from "./src/app";
import sequelize from "./src/Database/connection";

import {envConfig } from "./src/config/config"
import { config } from "dotenv"
import adminSeeder from "./adminSeeder";
import categoryControllers from "./src/controllers/categoryControllers";
import {Server} from 'socket.io';
import  jwt from "jsonwebtoken"
import User from "./src/Database/models/userModels";

function startServer(){
    const port = envConfig.port || 4000
    const server = app.listen(envConfig.port, () => {
        categoryControllers.seedCategory()
    console.log('Server has started at port[${port}]')
    adminSeeder()
})
const io = new Server(server,{
    cors : {
        origin : 'http://localhost:5173'
    }
})

let onlineUsers:{socketId:string,userId:string,role:string}[] = []
let addToOnlineUsers = (socketId:string,userId:string,role:string)=>{
    onlineUsers = onlineUsers.filter((user)=>user.userId !== userId) 
    onlineUsers.push({socketId,userId,role})
}



io.on("connection",(socket)=>{
    const {token} = socket.handshake.auth // jwt token 
    if(token){
        jwt.verify(token,envConfig.jwtSecretKey as string, async (err:any,result:any)=>{
            if(err){
                socket.emit("error",err)
            }else{
                const userData = await User.findByPk(result.userId) // {email:"",pass:"",role:""}
                if(!userData){
                   socket.emit("error","No user found with that token")
                    return
                }
                // userID grab garnu paryo 
                // 2, 2, customer
                addToOnlineUsers(socket.id,result.userId,userData.role)
          
            }
           })
           
    }
})

}

startServer()