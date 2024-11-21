

import express,{Router} from 'express'
import categoryControllers from '../controllers/categoryControllers'
import userMiddleware from '../middleware/userMiddleware'
const router:Router = express.Router()

router.route("/").get(categoryControllers.getCategories).post(userMiddleware.isUserLoggedIn, categoryControllers.addCategory)
router.route("/:id").patch(categoryControllers.updateCategory).delete(categoryControllers.deleteCategory)

export default router