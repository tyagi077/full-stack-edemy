import React, { useContext, useEffect, useState } from 'react'
import { assets, dummyStudentEnrolled } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'
import SkeletonCard from '../../components/educator/SkeltonCard'

function StudentsEnrolled() {

  const {user,BASE_URL }=useContext(AppContext)

  const [enrolledStudents,setEnrolledStudents]=useState(null)

  const fetchEnrolledStudents =async()=>{
    const token = localStorage.getItem("token")
    if (!token) return;
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/course/enrolled-Students`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(response.data.success){
         
          setEnrolledStudents(response.data.enrolledStudents.reverse())
         
       
        }else{
          toast.error(response.data.message)
        }

   }catch(error){
    toast.error(error.message)
   }
  }
  useEffect(()=>{
   if(user?.isEducator){
    
    fetchEnrolledStudents()
   }
  },[user?.isEducator])

  return enrolledStudents? (
    <div className='min-h-screen flex- flex-col items-start justify-between p-8 pb-0  pt-8'>
     <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500'>
          <table className='w-full overflow-hidden'>
            <thead className='text-gray-900 border-b border-gray-500 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>Student Name</th>
                <th className='px-4 py-3 font-semibold truncate'>Course Title</th>
                <th className='px-4 py-3 font-semibold truncate'>Date</th>
               
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
          
              {enrolledStudents.map((item,index)=>(
                <tr key={index} className='border-b border-gray-500'>
                <td className='px-4 pl-2 py-3 flex items-center space-x-3 truncate'>
                  {item.student.imageUrl?<img src={item.student.imageUrl} alt="" className='w-8'/>:<img src={assets.profile_img} alt="" className='w-8'/>}
                  <span className='truncate '>{item.student.username}</span>
          
                </td>
                <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                  <td className='px-4 py-3'>
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
     </div>
  ):<SkeletonCard/>
}

export default StudentsEnrolled