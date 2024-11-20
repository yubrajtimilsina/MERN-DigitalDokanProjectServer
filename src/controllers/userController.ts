
import { Request,Response } from "express";
import User from "../Database/models/userModels";
import bcrypt from 'bcrypt'


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
            password :bcrypt.hashSync(password,10), // Stored directly without hashing
        });
    
        // Respond with a success message
        res.status(201).json({
            message: "User registered successfully"
        });
    }

    static async login(req:Request,res:Response){
        //accept incoming data ---> email, password
        const {email, password} =req.body
        if(!email || !password){
            res.status(200).json({
                message : "please provide email, password"
            })
            return
        }
        //check email exixt on a table or not 
        const [user] = await User.findAll({ //find -->findAll---> Data in array
            where :{
                email : email
            }
        })
        //data return in array
       
        if(!user){
            res.status(404).json({
                message : "No user with this👌😁"
            })
        }else{
            // //if yes -->email exist-->check password
            const isEqual = bcrypt.compareSync(password,user.password)
            if(!isEqual){
                res.status(400).json({
                    message : "Invalid password😒"
                })
            }else{
                res.status(200).json({
                    message : "logged in sucessfully👌"
                })
            }
        }
    }
}

export default UserController