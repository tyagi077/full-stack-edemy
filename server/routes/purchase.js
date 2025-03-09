import express from "express"
import Razorpay from "razorpay"
import dotenv from "dotenv"
import Purchase from "../models/Purchase.js";
import User from "../models/UserS.js";
import Course from "../models/Course.js";
import crypto from "crypto";

dotenv.config()

const purchaseRouter = express.Router()

const instance = new Razorpay(
    { key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET }
)

purchaseRouter.post('/createOrder',async (req, res) => {
    try{
        const response =await instance.orders.create({
            amount: req.body.amount,
            currency: req.body.currency,
            receipt: "receipt#1",
        })
        res.json({
            response
        })
    }catch(error){
        res.json({
            error:error.message
        })
    }

});

purchaseRouter.get("/payment/:paymentId", async (req, res) => {
    const paymentId = req.params.paymentId
    try{
        const payment = await instance.payments.fetch(paymentId)
        if(!payment){
            return res.json({
                message:"Error at razorpay loading"
            })
        }
        res.json({
            payment
        })

    }catch(error){
        res.json({
            error:error.message
        })
    }
    
});

purchaseRouter.post("/verify",(req,res)=>{
 
    const razorpay_order_id =req.body.razorpay_order_id
    const razorpay_payment_id = req.body.razorpay_payment_id
    const secret = process.env.RAZORPAY_KEY_SECRET


// Step 1: Construct the message string
const message = razorpay_order_id + "|" + razorpay_payment_id;

const generated_signature= crypto.createHmac("sha256",secret)
.update(message)
.digest("hex")

const razorpay_signature = req.body.razorpay_signature

if (generated_signature === razorpay_signature) {
   res.json({
    status:true,
    message:"payment verification success"
   });
  } else {
    res.json({
        status:false,
        message:"Payment verification failed"
    });
  }

})

purchaseRouter.post("/storeOrder",async (req,res)=>{
    const {user_Id,course_Id,amount} =req.body
   const response =await Purchase.create({
        courseId:course_Id,
        userId:user_Id,
        amount
    })

    // update the student data 
    //update the course data

    await User.findByIdAndUpdate({
        _id:user_Id
    },{$push:{enrolledCourses:course_Id}})

    await Course.findByIdAndUpdate({
        _id:course_Id
    },{$push:{enrolledStudents:user_Id}})

    res.json({
        message:"success"
    })
})


export default purchaseRouter