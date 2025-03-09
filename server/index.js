import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mainRouter from "./routes/index.js"
import connectDB from "./config/mongodb.js"
import cors from "cors"
import connectCloudinary from "./config/cloudinary.js"
const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "https://full-stack-mayank-edemy.vercel.app"], // Allow both local & production frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization", // Allow auth headers
    credentials: true // Allow cookies & credentials
}));


const PORT = process.env.PORT ||3000


app.use(express.json())
await connectDB()

app.get("/", (req, res) => {
    res.send("API is running ");
});


await connectCloudinary()

app.use("/api/v1/",mainRouter)


export default createServer(app);