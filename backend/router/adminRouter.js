import express from "express"
import { authRequied } from "../middleware/authMiddleware.js"
import { adminAccess } from "../middleware/adminAccess.js"
import { deleteProduct, getAllOrders } from "../controller/adminController.js"

const router = express.Router()

router.get("/admin/orders",authRequied,adminAccess,getAllOrders)
router.delete("/admin/product/delete/:id",authRequied,adminAccess,deleteProduct)

export default router