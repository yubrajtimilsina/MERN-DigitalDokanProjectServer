
import express, {Router} from 'express'
import productController from '../controllers/productController'
import userMiddleware, { Role } from '../middleware/userMiddleware'
import {multer,storage} from '../middleware/multerMiddleware'
import errorHandler from '../services/errorHandler'

const upload = multer({storage : storage})

const router:Router = express.Router()

router.route("/")
.post(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), upload.single("productImgUrl"), errorHandler(productController.createProduct))
.get(productController.getAllProducts)

router.route("/:id")
.post(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), errorHandler(productController.deleteProducts))
.get(errorHandler(productController.getSingleProducts))
.delete(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), errorHandler (productController.deleteProducts))


export default router