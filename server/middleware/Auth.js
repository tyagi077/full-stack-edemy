import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Not authorized. No token provided.",
        });
    }
    const token = authHeader.split(" ")[1]; 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_Id = decoded.user_Id;
        next(); 
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid token.",
        });
    }
};
