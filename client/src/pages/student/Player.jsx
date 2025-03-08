import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'
import Loading from '../../components/student/Loading'
import axios from "axios"
import { toast } from 'react-toastify'

function Player() {

  const {BASE_URL , enrolledCourses, calculateChapterTime, user, fetchUserEnrolledCourses,fetchAllCourse } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSection, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [progressData, setProgressData] = useState(null)
  const [initialRating, setInitialRating] = useState(0)
  const [videoLoading, setVideoLoading] = useState(true)


  const handleVideoReady = () => {
    console.log("video ready");
    setVideoLoading(false)
  }

  function findLectureDuration(lecture) {
  
    let time = lecture.lectureDuration
    const date = new Date(time * 60000)

    const formattedTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
    return formattedTime;
  }

  const toggleSection = (index) => {
    setOpenSections((prev) => (
      {
        ...prev,
        [index]: !prev[index],
      }))
  }

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course)
        course.courseRatings.map((item) => {
          if (item.userId === user._id) {
            setInitialRating(item.rating)
          }
        })
      }

    })
  }

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData()
    }
  }, [enrolledCourses])

  const markLectureComplted = async (lectureId) => {
    try {
      const token = localStorage.getItem("token")
      const resposne = await axios.post(`${BASE_URL}/api/v1/user/update-course-progress`, {
        courseId,
        lectureId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (resposne.data.success) {
        toast.success(resposne.data.message)
        getCourseProgress()
      } else {
        toast.success(resposne.data.message)
      }
    } catch (error) {
      toast.success(error.message)
    }
  }

  const getCourseProgress=async()=>{
    try{
      const token = localStorage.getItem("token")
      const resposne = await axios.post(`${BASE_URL}/api/v1/user/get-course-progress`, {
        courseId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(resposne.data.success){
        setProgressData(resposne.data.progressData)
      }else{
        toast.error(resposne.data.message)
        console.log(resposne.data.message);
      }
    }catch(error){
      toast.error(error.message)
    }
  }


  const handleRating=async(rating)=>{
    try{
      const token = localStorage.getItem("token")
      const resposne = await axios.post(`${BASE_URL}/api/v1/user/add-rating`, {
        courseId,
        rating
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(resposne.data.success){
        toast.success(resposne.data.message)
        fetchAllCourse()
      }else{
        toast.error(resposne.data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    getCourseProgress()
  },[])
  return courseData? (
    <>
      <div className='grid grid-cols-2 px-20 gap-8 mb-30 pt-8'>
        {/* left column */}
        <div className=''>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2
                        rounded'>
                <div className='flex items-center justify-between px-4 py-3 
                         cursor-pointer' onClick={() => toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="" />
                    <p className='font-medium text-base'>{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='py-2 pl-10 pr-4 border-t border-gray-400'>
                    {chapter.chapterContent.map((lecture, index) => (
                      <li key={index} className='flex items-start gap-2 py-1'>
                        <img className='w-4 -4 mt-1' src= {progressData && progressData.lectureCompleted.includes(lecture._id) ? assets.blue_tick_icon : assets.play_icon} alt="" />
                        
                        <div className='flex w-full justify-between items-center text-sm text-gray-800  '>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && <p
                              onClick={() => setPlayerData({
                                ...lecture,lectureId:lecture._id, chapter: index + 1, lecture: index + 1

                              })} className='text-blue-500 cursor-pointer'>Watch</p>}
                            <p>{findLectureDuration(lecture)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>


              </div>
            ))}
          </div>

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course:</h1>
            <Rating initialRating={initialRating} onRate={handleRating} />
          </div>

        </div>

        {/* right column */}
        <div className="flex flex-col items-center mt-10">
          {playerData ? (
            <div>
              {/* Always render the YouTube component */}
              <YouTube
                onReady={handleVideoReady}
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />

              {/* Display loading message if the video is loading */}
              {videoLoading && (
                <div className="flex justify-center items-center mt-2">
                  <Loading />
                </div>
              )}

              {/* Render the content after the video is ready */}
              {!videoLoading && (
                <div className="flex justify-between items-center mt-1">
                  <p>
                    {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                  </p>
                  <button onClick={()=>markLectureComplted(playerData.lectureId)} className="text-blue-600">
                    {progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? "Completed" : "Mark Completed"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ""} alt="" className="w-128" />
          )}
        </div>

      </div>
      <Footer />
    </>
  ):"loading"
}

export default Player