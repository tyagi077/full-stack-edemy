import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { assets, dummyCourses } from '../../assets/assets'
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { toast } from 'react-toastify'
import SkeletonCard from '../../components/student/SkeltonCard'

function CourseDetails() {

  function findLectureDuration(lecture) {
    let time = lecture.lectureDuration
    const date = new Date(time * 60000)
    const formattedTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
    return formattedTime;
  }

  const { id } = useParams()
  const [courseData, setCourseData] = useState  (null)
  const [openSection, setOpenSection] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData,setPlayerData] = useState(null)

  const { allCourses, calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures,user } = useContext(AppContext)

  const fetchCourseData = async () => {
   try{
    const response = await axios.get(`http://localhost:3000/api/v1/course/course/${id}`)
    if(response.data.success){
      setCourseData(response.data.courseData)
    }else{
      toast.error(response.data.message);
    }
   }catch(error){
    toast.error(error.message);
   }
  }

  const enrolledCourse=async ()=>{
    try{
      if(!user){
        toast.error("Login to Enroll")
        return
      }
      if(isAlreadyEnrolled){
       toast.success("Already Enrolled")
        return
      }
            try {
              const response = await axios.post("http://localhost:3000/api/v1/purchase/createOrder", {
                amount: Math.round((courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100) * 100),
                currency: "INR"
              });
              handlePaymentVerify(response.data);
            } catch (error) {
              toast.error(error.message)
        
            }
        
    }catch(error){
      toast.error(error.message)
    }
  }

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID, 
      amount: data.response.amount,
      currency: data.response.currency,
      name: "Edemy",
      description: courseData.courseTitle,
      order_id: data.response.id,
      handler: async (response) => {
        try {
          console.log(response);
          const res = await axios.post("http://localhost:3000/api/v1/purchase/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature

          });
          console.log("Verification response:", res.data);
          if (res.data.status) {
            try {
              const successRes = await axios.get(`http://localhost:3000/api/v1/purchase/payment/${response.razorpay_payment_id}`);

              const paymentTime = new Date(successRes.data.payment.created_at * 1000).toLocaleString();
              const res = await axios.post(`http://localhost:3000/api/v1/purchase/storeOrder/`,{
                course_Id:id,
                user_Id:user._id,
                amount:Math.round((courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100) * 100)
              });
              setIsAlreadyEnrolled(true)
              toast.success("Purchase Success")
            }
            catch(error){
              toast.error("Something Went Wrong")
              console.log(error.message);
            }
            }
        } catch (error) {
          toast.error("Something Went Wrong")
          console.error("Verification failed:", error.message);
        }
      },
      prefill: {
        name: user.username,
        email: user.email,
        contact: "56556528128",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  useEffect(() => {
    fetchCourseData()

  }, [allCourses, id])


  useEffect(() => {
   if(user && courseData){
    setIsAlreadyEnrolled(user.enrolledCourses.includes(courseData._id))
   }

  }, [user, courseData])

  const toggleSection = (index) => {
    setOpenSection((prev) => (
      {
        ...prev,
        [index]: !prev[index],
      }))
  }
  console.log(courseData);

  return (
    courseData ? (
      <>
      <div className='grid grid-cols-2 px-20 py-10'>
        <div className='max-w-xl w-full '>
          <h1 className='text-3xl font-bold'>{courseData.courseTitle}</h1>
          <p className='pt-4 text-base' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>
          <div className='flex gap-1 pt-3 '>
            {calculateRating(courseData)}
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                i < Math.floor(calculateRating(courseData)) ? <img key={i} src={assets.star} alt="" className='w-4' /> :
                  <img key={i} src={assets.star_blank} alt="" className='w-4' />
              ))}
            </div>
            <span className='text-blue-600'>({courseData.courseRatings?.length} ratings)</span>
            <span>{courseData.enrolledStudents.length} students</span>
          </div>
          <p className='pt-2 text-sm'>Course by <span className='text-blue-600 cursor-pointer underline'>{courseData.educator?.username}</span></p>

          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer' onClick={() => toggleSection(index)}>
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
                          <img className='w-4 -4 mt-1' src={assets.play_icon} alt="" />
                          <div className='flex w-full justify-between items-center text-sm text-gray-800  '>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && <p 
                              onClick={()=>setPlayerData({
                                videoId:lecture.lectureUrl.split('/').pop()

                              })} className='text-blue-500 cursor-pointer'>Preview</p>}
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
          </div>

          <div className='py-20 '>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p className='pt-3 rich-text' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
          </div>
        </div>
        {/* right side */}
        <div className='w-full justify-center'>
          <div className='max-w-100 bg-white m-auto h-auto shadow-xl'>
            

            {playerData? <YouTube videoId={playerData.videoId} opts={{playerVars:{
              autoplay:1
            }}} iframeClassName='w-full aspect-video'/>:<img src={courseData.courseThumbnail} alt="" className='w-200' />}
    


            <div className='p-5'>
              <div className='flex items-center gap-2'>
                <img className='w-3.5' src={assets.time_left_clock_icon} alt="" />
                <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price!</p>
              </div>
              <div className='flex gap-3 items-center pt-2'>
                <p className='text-gray-800 text-4xl font-semibold'>₹{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
                <p className='text-lg text-gray-500 line-through '>₹{courseData.coursePrice}</p>
                <p className='text-lg text-gray-500'>{courseData.discount}% off</p>
              </div>

              <div className='flex gap-4 mt-2  items-center'>
                <div className='flex items-center gap-1'>
                  <img src={assets.star} alt="" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className='h-4 w-px bg-gray-500'></div>
                <div className='flex items-center gap-1'>
                  <img src={assets.time_clock_icon} alt="" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>
                <div className='h-4 w-px bg-gray-500'>
                </div>
                <div className='flex items-center gap-1'>
                  <img src={assets.lesson_icon} alt="" />
                  <p>{calculateNoOfLectures(courseData)} lesson</p>
                </div>
              </div>
              <button onClick={enrolledCourse} className='mt-6 w-full py-3 rounded bg-blue-600 text-white font-medium'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
              <div className='pt-6'>
                <p className='text-xl font-medium text-gray-800'>What's in the course?</p>
                <ul className='ml-4 pt-2 text-sm list-disc text-gray-500'>
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands-on project guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowledge.</li>
                  <li>Certificate of completion.</li>
                  <li>Quizzes to test your knowledge.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Footer/>
      </>

    ) : <SkeletonCard/>
  ) 
}
export default CourseDetails