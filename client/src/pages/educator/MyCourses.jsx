import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import SkeletonCard from '../../components/educator/SkeltonCard'
function MyCourses() {

const {user,BASE_URL } =useContext(AppContext)
  const [courses,setCourses] = useState(null)

  const fetchEducatorCourses = async()=>{
    const token = localStorage.getItem("token")
    if (!token) return;
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/course/my-course`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        response.data.success &&setCourses(response.data.courses)

   }catch(error){
    toast.error(error.message)
   }
  }

  useEffect(()=>{
   if(user?.isEducator){
    fetchEducatorCourses()
   }
  },[user?.isEducator])

  return courses ?(
    <div className='h-screen flex flex-col items-start justify-between  p-8 pb-0 pt-8'>
      <div className='pb-4 text-lg font-medium w-full max-w-4xl'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-500'>
          <table className='w-full overflow-hidden '>
            <thead className='text-gray-900 border-b border-gray-500 text-sm  text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published On</th>
               
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
          
              {courses.map((course,index)=>(
                <tr key={index} className='border-b border-gray-500'>
                <td className='px-4 pl-2 py-3 flex items-center space-x-3 truncate'>
                  <img src={course.courseThumbnail} alt="" className='w-16'/>
                  <span className='truncate '>{course.courseTitle}</span>
          
                </td>
                <td className='px-4 py-3'>₹{Math.floor(course.enrolledStudents.length* (course.coursePrice-course.discount*course.coursePrice/100))}</td>
                <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                <td className='px-4 py-3'>
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ):<SkeletonCard/>
}

export default MyCourses