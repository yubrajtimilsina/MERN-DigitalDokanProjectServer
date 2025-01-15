import { Request, Response } from "express";
import Product from "../Database/models/productModels";
import Category from "../Database/models/categoryModel";


// interface ProductRequest extends Request{
//     file? : {
//         filename : string
//     },
// }

class ProductController{
    async createProduct(req:Request,res:Response):Promise<void>{
        const { productName,productDescription,productPrice,productTotalStock,discount,categoryId} = req.body
        console.log(req.file)
        const filename = req.file ? req.file.filename : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
        if(!productName || !productDescription || !productPrice || !productTotalStock || !categoryId){
            res.status(400).json({
                message : "Please provide productName,productDescription,productPrice,productTotalStock,discount "
            })
            return
        }
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStock,
            discount : discount || 0,
            categoryId,
            productImgUrl : filename
        })
        res.status(200).json({
            message : "Product created sucessfully"
        })
    }
    async getAllProducts(req:Request, res: Response) : Promise<void>{
        const datas = await Product.findAll({
            include : [
                {
                model : Category,
                attributes : ['id','categoryName']
                }
            ]
        })
        res.status(200).json({
            message : "Products fetched sucessfully",
            data : datas
        })
    }
    async getSingleProducts(req:Request, res: Response) : Promise<void>{
        const {id} = req.params
        const [datas] = await Product.findAll({
            where : {
                id : id
            },
            include : [
                {
                model : Category,
                attributes : ['id', 'categoryName']
                }
            ]
        })
        res.status(200).json({
            message : "Products fetched sucessfully",
            data : datas
        })
    }

    async deleteProducts(req:Request, res: Response) : Promise<void>{
        const {id} = req.params
        const datas = await Product.findAll({
            where : {
                id : id
            }
        })
        if(datas.length === 0){
            res.status(404).json({
                message : "No product with that id"
            })
        }else{
            await Product.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : "Products deleted sucessfully",
                data : datas
            })
        }
        
    }
} 

export default new ProductController
