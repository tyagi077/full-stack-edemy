import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

function CoursesSection() {

    const {allCourses} = useContext(AppContext)

  return (
    <div className='py-10 small:py-6 px-5 xs:px-8 small:px-10 sm:px-10 md:px-15 lg:px-20 xl:px-30'>
        <h2 className='text-[18px] small:text-3xl font-medium text-black'>Learn from the best</h2>
        <p className='hidden small:inline-block text-[16px] text-sm   text-[#565656]'>Discover our top-rated courses across various categories. From coding and design to <br /> business and wellness, our courses are crafted to deliver results.</p>
        <p className='small:hidden text-[12px]  text-[#565656]'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>

        <div className='flex flex-wrap gap-4 my-16 items-center justify-center'>
            {allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course} />)}
        </div>


          <Link to={'/course-list'} onClick={()=>scrollTo(0,0)}
          className='text-gray-600 border border-gray-600 px-10 py-3 rounded'
          >Show all courses</Link>
      </div>
  )
}

export default CoursesSection