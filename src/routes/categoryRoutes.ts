

import express,{Router} from 'express'
import categoryControllers from '../controllers/categoryControllers'
import userMiddleware, { Role } from '../middleware/userMiddleware'
const router:Router = express.Router()

router.route("/").get(categoryControllers.getCategories).post(userMiddleware.isUserLoggedIn, userMiddleware.restrictTo(Role.Admin), categoryControllers.addCategory)
router.route("/:id").patch(categoryControllers.updateCategory).delete(categoryControllers.deleteCategory)

export default router