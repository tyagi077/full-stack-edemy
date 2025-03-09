import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mainRouter from "./routes/index.js";
import connectDB from "./config/mongodb.js";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://full-stack-mayank-edemy.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

const PORT = process.env.PORT || 3000;
app.use(express.json());

async function startServer() {
    try {
        await connectDB();
        await connectCloudinary();

        app.get("/", (req, res) => {
            res.send("API is running");
        });

        app.use("/api/v1/", mainRouter);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

startServer();
