import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mainRouter from "./routes/index.js"
import connectDB from "./config/mongodb.js"
import cors from "cors"
import connectCloudinary from "./config/cloudinary.js"
const app = express()

app.use(cors({
    origin: "https://full-stack-mayank-edemy.vercel.app", // Allow frontend origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization", // Allow Authorization header
    credentials: true, // Allow sending cookies & credentials
}));



app.use(express.json())
await connectDB()

await connectCloudinary()

app.use("/api/v1/",mainRouter)



app.listen(3000)