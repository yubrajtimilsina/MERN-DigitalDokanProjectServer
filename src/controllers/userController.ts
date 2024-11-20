
import { Request,Response } from "express";
import User from "../Database/models/userModels";
import bcrypt from 'bcrypt'
import generateToken from "../services/generateToken";
import generateOtp from "../services/generateOtp";
import sendMail from "../services/sendMail";


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

        await sendMail({
            to : email,
            subject : "Regestration sucessfullyon digital dokan",
            text : "Welcome to digital Dokan Thank you"
        })
    
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

                const token = generateToken(user.id)
                res.status(200).json({
                    message : "logged in sucessfully👌",
                    token
                })
            }
        }
    }

    static async handleForgotPassword(req: Request, res: Response): Promise<void> {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: "Please provide email" });
            return;
        }

        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            res.status(404).json({ message: "Email not registered" });
            return;
        }

        const otp = generateOtp();
        await sendMail({
            to: email,
            subject: "Digital Dokan Password Change Request",
            text: `You just requested to reset a password. Here is your OTP: ${otp}`
        });
        user.otp = otp.toString()
        user.otpGenerateTime = Date.now().toString()
        await user.save()

        res.status(200).json({ message: "Password Reset OTP sent!!!!" });
        return; // Ensuring the function explicitly returns void
    }
}
    
export default UserController