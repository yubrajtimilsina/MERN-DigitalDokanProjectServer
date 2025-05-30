import { Request, Response } from "express";
import Product from "../Database/models/productModels";
import Category from "../Database/models/categoryModel";
import Review from "../Database/models/reviewModel";
import User from "../Database/models/userModels";


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
       const product =  await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStock,
            discount : discount || 0,
            categoryId,
            productImgUrl : filename
        })
        res.status(200).json({
            message : "Product created sucessfully",
            data : product
        })
    }
    async getAllProducts(req:Request, res: Response) : Promise<void>{
        const datas = await Product.findAll({
            include : [
                {
                model : Category,
                attributes : ['id','categoryName']
                }
            ],
            attributes: [
                'id', 'productName', 'productDescription', 'productPrice', 
                'productTotalStock', 'discount', 'productImgUrl', 
                'averageRating', 'reviewCount', 'categoryId', 'createdAt', 'updatedAt'
            ]
        })
        res.status(200).json({
            message : "Products fetched sucessfully",
            data : datas
        })
    }
    async getSingleProducts(req:Request, res: Response) : Promise<void>{
        const {id} = req.params
        const product = await Product.findByPk(id, {
            include : [
                {
                    model : Category,
                    attributes : ['id', 'categoryName']
                },
                {
                    model: Review,
                    where: { isVisible: true },
                    required: false,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ],
                    limit: 5,
                    order: [['createdAt', 'DESC']]
                }
            ],
            attributes: [
                'id', 'productName', 'productDescription', 'productPrice', 
                'productTotalStock', 'discount', 'productImgUrl', 
                'averageRating', 'reviewCount', 'categoryId', 'createdAt', 'updatedAt'
            ]
        });
        
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }
        
        res.status(200).json({
            message: "Product fetched successfully",
            data: product
        });
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
