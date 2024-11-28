
import { Request, Response } from "express";
import OrderDetails from "../Database/models/orderDetail";

interface IProduct{
    productId : string,
    productQty : string
}

class OrderController{
    async createOrder(req:Request,res:Response){
        const {phoneNumber,shippingAddress,totalAmount,products} = req.body 
        const products: IProduct[] = req.body
        if(!phoneNumber || !shippingAddress || !totalAmount || products.length == 0 ){
            res.status(400).json({
                message : "Please provide phoneNumber,shippingAddress,totalAmount,products"
        })
            return
        }
        const orderData = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount
        })
        products.forEach(function(product){
            OrderDetails.create({
                quantity :product.productQty,
                productId : product.productId
            })

        })
    }
}

export default new OrderController
