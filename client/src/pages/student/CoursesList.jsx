import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import Footer from '../../components/student/Footer'
import { assets } from '../../assets/assets'

function CoursesList() {

  const { navigate,allCourses } = useContext(AppContext)
  const {input} = useParams()

  const [filteredCourse,setFilteredCourse] = useState([])

  useEffect(()=>{
    if(allCourses && allCourses.length>0){
      const tempCourses=allCourses.slice()

      input ? setFilteredCourse(tempCourses.filter((item)=>item.courseTitle.toLowerCase().includes(input.toLowerCase()))) :setFilteredCourse(tempCourses)
    }
  },[allCourses,input])



  return (
    <>
      <div className='relative px-36  pt-20 text-left'>
        <div className='flex gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500'><span onClick={() => navigate("/")} className='text-blue-600 cursor-pointer'>Home</span> / <span>Course List</span></p>
          </div>
            <SearchBar data={input}/>
        </div>
        {
          input && <div className='inline-flex items-center gap-4 px-4 py-2 border text-gray-600  border-gray-400 mt-8 '>
            <p>{input}</p>
            <img className='cursor-pointer' onClick={()=>{
              navigate('/course-list')
            }} src={assets.cross_icon} alt="" />
          </div>
        }
        <div className='grid grid-cols-4 gap-3 my-16'>
          {filteredCourse.map((course,index)=><CourseCard key={index} course={course}/>)}
        </div>
      </div>

      <Footer/>
    </>
  )
}

export default CoursesList