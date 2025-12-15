import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { connectDB } from "./config/connectDB.js"
import {seed} from "./util/seed.js"

// routers
import productRouter from "./router/productRouter.js"
import authRouter from "./router/authRouter.js"
import addToCartRouter from "./router/addToCartRouter.js"
import likeRouter from "./router/wishListRouter.js"
import ordersRouter from "./router/ordersRouter.js"
import userAddressRouter from "./router/userAddressRouter.js"



const app = express()
dotenv.config()
app.use(cors({
  origin: [
    "https://vishnu-ecommerce-vle9-git-main-vishnu-shankars-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}))

app.use(express.json())

const PORT = process.env.PORT



app.get("/", (req, res) => {
    res.json(`Port was running in ${PORT}`)
})

// API

app.use("/api",productRouter)
app.use("/api",authRouter)
app.use("/api",addToCartRouter)
app.use("/api",likeRouter)
app.use("/api",ordersRouter)
app.use("/api",userAddressRouter)

async function start() {

    await connectDB(process.env.MONGODB_URL)
    // await seed(process.env.MONGODB_URL)

    app.listen(PORT, async () => {
        console.log(`Port was running in ${PORT}`)
    })

}
start()