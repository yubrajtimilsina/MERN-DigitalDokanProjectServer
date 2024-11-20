import express from 'express'



import './Database/connection'
import userRoute from './routes/userRoutes'


const app = express()
app.use(express.json())
app.use("/api/auth",userRoute)

export default app

