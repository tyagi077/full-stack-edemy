import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mainRouter from "./routes/index.js";
import connectDB from "./config/mongodb.js";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://full-stack-edemy.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

app.use(express.json());

async function initialize() {
    try {
        await connectDB();
        await connectCloudinary();
        console.log("✅ Database and Cloudinary connected.");
    } catch (error) {
        console.error("❌ Error initializing services:", error);
    }
}

initialize();

app.get("/", (req, res) => {
    res.send("🚀 API is running");
});

app.use("/api/v1/", mainRouter);

export default app;
