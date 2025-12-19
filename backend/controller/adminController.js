import { Orders } from "../models/orderSchema.js"
import {Products} from "../models/productsSchema.js"
export const getAllOrders = async (req, res) => {
    try {

        let orders = await Orders.find({}).sort({ createdAt: -1 })
        if (orders.length === 0) return res.status(400).json({ message: "No one Orders the Product" })
        return res.status(200).json(orders)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let {id} = req.params
        let product = await Products.findByIdAndDelete(id)
        if (!product) return res.status(404).json({ message: "product Not found" })

        return res.status(200).json(product)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}