import express from 'express'



import './Database/connection'
import userRoute from './routes/userRoutes'
import categoryRoutes from './routes/categoryRoutes'

const app = express()
app.use(express.json())
app.use("/api/auth",userRoute)
app.use("/api/category",categoryRoutes)

export default app

