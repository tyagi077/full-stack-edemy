import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

function CoursesSection() {

    const {allCourses} = useContext(AppContext)

  return (
    <div className='py-16 px-40'>
        <h2 className='text-3xl font-medium text-black'>Learn from the best</h2>
        <p className=' text-sm mt-3 text-[#565656]'>Discover our top-rated courses across various categories. From coding and design to <br /> business and wellness, our courses are crafted to deliver results.</p>

        <div className='grid grid-cols-4 px-0 gap-4 my-16 '>
            {allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course} />)}
        </div>


          <Link to={'/course-list'} onClick={()=>scrollTo(0,0)}
          className='text-gray-600 border border-gray-600 px-10 py-3 rounded'
          >Show all courses</Link>
      </div>
  )
}

export default CoursesSection