import express from "express"
import userRouter from "./user.js"
import courseRouter from "./course.js"
import purchaseRouter from "./purchase.js"

const router = express.Router()

router.use("/user",userRouter)
router.use("/course",courseRouter)
router.use("/purchase",purchaseRouter)



export default router