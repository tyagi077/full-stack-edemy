import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

function SideBar() {

  const {navigate} = useContext(AppContext);
  return (
    <div className='w-64 pt-4 h-screen  border-r border-gray-800'>
      <div className='flex gap-2 items-center text-start hover:bg-[#F2F3FF]  hover:border-r-[6px] hover:border-blue-500  py-3 px-8' onClick={()=>navigate("/educator/")}>
        <img src={assets.home_icon} alt="" />
        <p>Dashboard</p>
      </div>
      <div className='flex gap-2 items-center text-start hover:bg-[#F2F3FF] hover:border-r-[6px] hover:border-blue-500 py-3 px-8' onClick={()=>navigate("/educator/add-course")}>
        <img src={assets.add_icon} alt="" />
        <p>Add Course</p>
      </div>
      <div className='flex gap-2 items-center text-start hover:bg-[#F2F3FF]  hover:border-r-[6px] hover:border-blue-500 py-3 px-8' onClick={()=>navigate("/educator/my-course")}>
        <img src={assets.my_course_icon} alt="" />
        <p>My Course</p>
      </div>
      <div className='flex gap-2 items-center text-start hover:bg-[#F2F3FF]  hover:border-r-[6px] hover:border-blue-500 py-3 px-8' onClick={()=>navigate("/educator/student-enrolled")}>
        <img src={assets.person_tick_icon} alt="" />
        <p>Student Enrolled</p>
      </div>
    </div>
  )
}

export default SideBar