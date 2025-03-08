import express from "express"
import User from "../models/user.js"
import { z } from "zod"
import { CourseProgress } from "../models/CourseProgress.js"
import Course from "../models/Course.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Auth } from "../middleware/Auth.js"
dotenv.config()
const userRouter = express.Router()

const SignUpSchema = z.object({
    username: z.string().min(3, "username must be atleast 3 characters").max(20),
    password: z.string().min(6, "password must be atleast 6 characters").max(20),
    email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
    imageUrl: z.string().optional()
})
userRouter.post("/signup", async (req, res) => {

    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            success: false,
            error: parsedData.error.issues[0].message
        })
        return
    }

    try {
        await User.create({
            username: parsedData?.data?.username,
            email: parsedData?.data?.email,
            password: parsedData?.data?.password,
            imageUrl: parsedData?.data?.imageUrl
        })
        res.json({
            success: true,
            message: "Account created successfully! You can now log in."
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: "User already Exits with this email"
        })
        return
    }
})

const SignInSchema = z.object({
    password: z.string().min(6, "password must be atleast 6 characters").max(20),
    email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
})


userRouter.post("/signin", async (req, res) => {

    const parsedData = SignInSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            success: false,
            error: parsedData.error.issues[0].message
        })
        return
    }


    try {
        const user = await User.findOne({
            email: parsedData?.data?.email,
            password: parsedData?.data?.password
        })

        if (!user) {
            res.json({
                success: false,
                message: "No user found"
            })
            return
        }

        const token = jwt.sign({
            user_Id: user._id
        }, process.env.JWT_SECRET)


        res.json({
            success: true,
            message: "Login successful! Welcome back.",
            token: token
        })

    }
    catch (error) {
        res.json({
            success: false,
            message: error.mesasge
        })
        return
    }
})

userRouter.put("/update", Auth, async (req, res) => {
    const id = req.user_Id;
    const { username, password, imageUrl, isEducator } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                username: username,
                password: password,
                imageUrl: imageUrl,
                isEducator: isEducator
            }
        })
        if (!user) {
          return  res.json({
            success:false,
            message:"User Not Found"
           })
        } else {
            res.json({
                success: true,
                message: "Updated Successfully"
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.mesasge
        })
    }
})

userRouter.get("/data", Auth, async (req, res) => {
    try {
        const userId = req.user_Id;
        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.json({ success: false, message: "User Not found" })
        }

        res.json({
            success: true, user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.mesasge
        })
    }

})
userRouter.get("/enrolled-courses", Auth, async (req, res) => {
    try {
        const userId = req.user_Id
        const user = await User.findById(userId).populate('enrolledCourses')
        if (!user) {
            return res.json({ success: false, message: "User Not found" })
        }
        res.json({
            success: true, user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.mesasge
        })
    }

})


//update user course progress
userRouter.post("/update-course-progress", Auth, async (req, res) => {
    try {
        const userId = req.user_Id;
        const { courseId, lectureId } = req.body

        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({
                    success: true,
                    message: 'Lecture Already Completed'
                })
            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        } else {
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })
        }
        res.json({
            success: true,
            message: 'Completed'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.mesasge
        })
    }
})

//get user course progress

userRouter.post("/get-course-progress", Auth, async (req, res) => {
    try {
        const userId = req.user_Id;
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        res.json({
            success: true,
            progressData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})


// Add user  Rating to course
userRouter.post("/add-rating", Auth, async (req, res) => {
    const userId = req.user_Id;
    const { courseId, rating } = req.body;

    if (!userId || !courseId || !rating || rating < 1 || rating > 5) {
        return res.json({
            success: false,
            message: "Invalid details"
        })
    }
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({
                success: false,
                message: "Course not found"
            })
        }
        const user = await User.findById(userId)
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({
                success: false,
                message: "user has not purchased this course."
            })
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId)

        if (existingRatingIndex > -1) {
            course.courseRatings[existingRatingIndex].rating = rating;
        } else {
            course.courseRatings.push({ userId, rating })
        }

        await course.save();

        return res.json({
            success: true,
            message: "Rating added"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})


export default userRouter