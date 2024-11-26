

import express,{Router} from 'express'
import categoryControllers from '../controllers/categoryControllers'
import userMiddleware, { Role } from '../middleware/userMiddleware'
const router:Router = express.Router()

router.route("/").get(categoryControllers.getCategories).post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), categoryControllers.addCategory)
router.route("/:id").patch(userMiddleware.accessTo(Role.Admin), categoryControllers.updateCategory).delete(userMiddleware.accessTo(Role.Admin), categoryControllers.deleteCategory)

export default router