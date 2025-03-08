import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mainRouter from "./routes/index.js"
import connectDB from "./config/mongodb.js"
import cors from "cors"
import connectCloudinary from "./config/cloudinary.js"
const app = express()

app.use(cors({
    origin: "http://localhost:5173/"
}));



app.use(express.json())
await connectDB()

await connectCloudinary()

app.use("/api/v1/",mainRouter)



app.listen(3000)