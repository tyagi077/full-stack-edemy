import { createContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [allCourses, setAllCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])
 

    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")
            if (!token) return;
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/user/data`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.data.success) {
                    setUser(response.data.user)
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
               toast.error(error.message)
            }
        }
        fetchUser()
    }, [])

    const navigate = useNavigate();

    //fetch all courses
    const fetchAllCourse = async () => {
        try {

            const response = await axios.get(`${BASE_URL}/api/v1/course/`)
            if (response.data.success) {
                setAllCourses(response.data.courses)
            }else{
                toast.error(response.data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    //function to calculate average rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach((rating) => {
            totalRating += rating.rating
        })
        return Math.floor(totalRating / course.courseRatings.length)
    }

    //function to calculate course chapter time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        const date = new Date(time * 60000)//convert minute to miliseconds

        const formattedTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
        return formattedTime;
    }

    //function to calculate course duration
    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        const date = new Date(time * 60000)//convert minute to miliseconds

        const formattedTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
        return formattedTime;
    }

    //function calculate to no of lectures in the course
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        });
        return totalLectures;
    }

    // fetch user enrolled courses

    const fetchUserEnrolledCourses = async () => {
        const token = localStorage.getItem("token")
        if (!token) return;

        const response = await axios.get(`${BASE_URL}/api/v1/user/enrolled-courses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setEnrolledCourses(response.data.user.enrolledCourses)


    }

    useEffect(() => {
        fetchAllCourse(),
        fetchUserEnrolledCourses()
    }, [])

    const value = {
        allCourses, user,BASE_URL, setUser,fetchAllCourse, navigate, calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures, fetchUserEnrolledCourses, enrolledCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}