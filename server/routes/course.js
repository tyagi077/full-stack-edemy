import express from "express"
import Course from "../models/Course.js"
import { v2 as cloudinary } from 'cloudinary';
import upload from "../config/multer.js";
import Purchase from "../models/Purchase.js";
import User from "../models/UserS.js";
import { Auth } from "../middleware/Auth.js"
const courseRouter = express.Router()

courseRouter.post("/add-course", Auth, upload.single("image"), async (req, res) => {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const eductorId = req.user_Id

        if (!imageFile) {
            return res.json({
                success: false,
                message: "Thumbnail Not Attached"
            })
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = eductorId

        const newCourse = await Course.create(parsedCourseData)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({
            success: true,
            message: 'Course Added'
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})

courseRouter.get("/my-course", Auth, async (req, res) => {
    try {
        const educator = req.user_Id

        const courses = await Course.find({
            educator
        })



        res.json({
            success: true, courses
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})


// Get the Dashboard  Data (Total Earnings ,Enorlled Students,No of Courses)
courseRouter.get("/dashboard", Auth, async (req, res) => {

    const educator = req.user_Id;

    let totalCourse = 0;
    let totalEarnings = 0;
    let enrolledStudentsData = []

    try {
        const courses = await Course.find({ educator })
        if (courses.length>0) {
            totalCourse = courses.length;
            
            const courseIds = courses.map(course => course._id);

            //calculating total earning from purchase
            
           
            const purchases = await Purchase.find({
                courseId: { $in: courseIds }
            })
            

            totalEarnings = purchases.reduce((sum, purchase) =>
                sum + purchase.amount, 0
            );
            

            for (const course of courses) {
                const students = await User.find({
                    _id: { $in: course.enrolledStudents }
                }, 'username imageUrl')

                students.forEach(student => {
                    enrolledStudentsData.push({
                        courseTitle: course.courseTitle,
                        student
                    })
                })

            }
        }

        res.json({
            success: true,
            dashboardData: {
                totalEarnings, totalCourse, enrolledStudentsData
            }
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }


})

//get enrolledstudent data
courseRouter.get("/enrolled-Students", Auth, async (req, res) => {
    const educator = req.user_Id

    // getting all the courses created by the educator 123
    const courses = await Course.find({
        educator
    })


    try {
        //getting all the course ids 
        const courseIds = courses.map(course => course._id);

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
        }).populate('userId', 'username imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))


        res.json({
            success: true,
            enrolledStudents
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

})

//get all courses
courseRouter.get("/", async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({ path: "educator", select: "username" }).select(['-courseContent', '-enrolledStudents'])
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})



//get courses by id

courseRouter.get("/course/:id", async (req, res) => {
    try {
        const id = req.params.id

        const courseData = await Course.findById(id).populate({path:"educator",select:"username"})
        //Remove lecture Url if preview is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            })
        })

        res.json({ success: true, courseData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})






export default courseRouter