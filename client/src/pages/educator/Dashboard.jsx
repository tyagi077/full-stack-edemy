import React, { useContext, useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import SkeletonCard from '../../components/educator/SkeltonCard'

function Dashboard() {
const [dashboardData,setDashboardData] = useState(null)
const {user} =useContext(AppContext)

const fetchDashboardData=async ()=>{
  const token = localStorage.getItem("token")
  if (!token) return;
  try {
      const response = await axios.get("http://localhost:3000/api/v1/course/dashboard", {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      
      if (response.data.success) {
         
          setDashboardData(response.data.dashboardData)
      }else{
          toast.error(data.message)
      }
  } catch (error) {
     toast.error(error.message)
  }
}

useEffect(()=>{
  if(user?.isEducator){
    fetchDashboardData()
  }
},[user?.isEducator])

  return dashboardData? (
    <div className='min-h-screen flex flex-col items-start gap-8 p-8 pb-0 pt-8 '>
      <div className='flex flex-wrap gap-5  items-center'>
        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md '>
          <img src={assets.patients_icon} alt=""  />
          <div className='flex flex-col '>
          <div className='text-xl font-semibold'>{dashboardData.enrolledStudentsData.length}</div>
          <div className='text-sm text-[#7C7E90]'>Total Enrolments</div>
          </div>
        </div>
        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md '>
          <img src={assets.appointments_icon} alt="" />
          <div className='flex flex-col '>
          <div className='text-xl font-semibold'>{dashboardData.totalCourse}</div>
          <div className='text-sm text-[#7C7E90]'>Total Courses</div>
          </div>
        </div>
        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md '>
        <img src={assets.earning_icon} alt="" />
          <div className='flex flex-col '>
          <div className='text-xl font-semibold'>₹{dashboardData.totalEarnings}</div>
          <div className='text-sm text-[#7C7E90]'>Total Earnings</div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-2xl'>
      <h2 className='text-lg font-medium pb-4'>Latest Enrollments</h2>
      <div className='flex flex-col items-center w-full max-w-4xl overflow-hidden rounded-md bg-white border border-gray-500'>
        <table className=' w-full overflow-hidden'>
          <thead className='Text-gray-900 border-b border-gray-500 text-sm text-left'>
            <tr>
              <th className='px-4 py-3 font-semibold text-center'>#</th>
              <th className='px-4 py-3 font-semibold'>Student name</th>
              <th className='px-4 py-3 font-semibold'>Course Title</th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-500'>
            {dashboardData.enrolledStudentsData.map((item,index)=>(
              <tr key={index} className='border-b border-gray-500'>
                <td className='px-4 py-3 text-center'>{index+1}</td>
                <td className='px-4 py-3 flex items-center space-x-3'>
                  {item.student.imageUrl?<img src={item.student.imageUrl} alt="Profile" className='w-9 h-9 rounded-full'/>:<img src={assets.profile_img} alt="Profile" className='w-9 h-9 rounded-full'/>}
                  <span className='truncate'>{item.student.username}</span>
                </td>
                <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>
    </div>
  ):<SkeletonCard/>
}

export default Dashboard