import express from 'express'



import './Database/connection'
import userRoute from './routes/userRoutes'
import categoryRoutes from './routes/categoryRoutes'
import productRoute from './routes/productRoute'
import OrderRoute from './routes/ordreRoute'
import CartRoute from './routes/cartRoutes'
import reviewRoute from './routes/reviewRoutes'
import cors from 'cors'

const app = express()
app.use(cors({
    origin : "*"
}))

app.use(express.json())


app.use("/api/auth",userRoute)
app.use("/api/category",categoryRoutes)
app.use("/api/product",productRoute)
app.use("/api/order",OrderRoute)
app.use("/api/cart", CartRoute)
app.use("/api/review", reviewRoute)

app.use(express.static("./src/uploads"))

export default app

