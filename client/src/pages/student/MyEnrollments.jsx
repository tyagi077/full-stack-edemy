import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Footer from '../../components/student/Footer'
import axios from "axios"
import { toast } from 'react-toastify'
function MyEnrollments() {
  const {BASE_URL , enrolledCourses, calculateCourseDuration, navigate, user, fetchUserEnrolledCourses, calculateNoOfLectures } = useContext(AppContext)

  const [progressArray, setProgressArray] = useState([])

  const getCourseProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const response = await axios.post(`${BASE_URL}/api/v1/user/get-course-progress`, {
            courseId: course._id
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
          
          let totalLectures = calculateNoOfLectures(course);
          
          const lectureComplted = response.data.progressData ? response.data.progressData.lectureCompleted.length : 0;
          return { totalLectures, lectureComplted }
        })
      )
      setProgressArray(tempProgressArray)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserEnrolledCourses()
    }
  }, [user])
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress()
    }
  }, [enrolledCourses])

  return enrolledCourses ? (
    <>
      <div className='flex flex-col items-start justify-between px-20 pb-20 pt-8'>
        <div className='pb-4 w-full text-lg font-medium'>
          <h2 className='pb-4 text-lg font-medium'>My Enrollments</h2>
          <div className='flex flex-col items-center   w-full overflow-hidden rounded-md bg-white border border-gray-500'>
            <table className='w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500 text-md text-left'>
                <tr>
                  <th className='px-4  py-3 font-semibold truncate'>Course</th>
                  <th className='px-4 py-3 font-semibold truncate'>Duration</th>
                  <th className='px-4 py-3 font-semibold truncate'>Completed</th>
                  <th className='px-4 py-3 font-semibold truncate'>Status</th>

                </tr>
              </thead>
              <tbody className='text-sm text-gray-500'>

                {enrolledCourses.map((course, index) => (
                  <tr key={index} className='border-b border-gray-500'>
                    <td className='px-4 pl-2 py-3 flex items-center space-x-3 truncate'>
                      <img src={course.courseThumbnail} alt="" className='w-34' />
                      <div className='flex flex-col w-[70%] gap-2'>
                        <span className='truncate '>{course.courseTitle}</span>
                        <div>
                          <div className='bg-gray-300 h-2 w-full rounded '>
                            
                          {progressArray.length>0&&<div style={{ width: `${(progressArray[index].lectureComplted / progressArray[index].totalLectures) * 100}%` }} className={`bg-blue-500 h-2   rounded`}>
                           
                           </div>}
                          </div>
                        </div>
                      </div>


                    </td>
                    <td className='px-4 py-3'>{calculateCourseDuration(course)}</td>
                    <td className='px-4 py-3'>{progressArray[index] && `${progressArray[index].lectureComplted} / ${progressArray[index].totalLectures} `}<span>Lectures</span></td>
                    <td className='px-4 py-3'>
                      <button onClick={() => navigate('/player/' + course._id)} className='px-5 py-1.5 bg-blue-600 text-white'>{progressArray[index] && progressArray[index].lectureComplted / progressArray[index].totalLectures === 1 ? 'Completed' : 'On Going'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Footer />
    </>
  ) : "loading"
}

export default MyEnrollments