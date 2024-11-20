
import { Request,Response } from "express";
import User from "../Database/models/userModels";
import sequelize  from "../Database/connection";


class UserController{
    static async register(req:Request,res:Response) {
        // Receive incoming user data
        const { username, email, password } = req.body;
    
        // Check if all required fields are provided
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Please provide username, email, password"
            });
            return;
        }

        // Insert user data into the users table without hashing the password
        await User.create({
            username,
            email,
            password // Stored directly without hashing
        });
    
        // Respond with a success message
        res.status(201).json({
            message: "User registered successfully"
        });
    }
}

export default UserController