import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

function CourseCard({ course }) {
    const { calculateRating } = useContext(AppContext)
    return (
        <Link
            to={'/course/' + course._id}
            onClick={() => scrollTo(0, 0)}
            className='max-h-80 border-1 border-gray-300 rounded-lg overflow-hidden'>
            <img className='w-full h-full max-h-40' src={course.courseThumbnail} alt=""  />
            <div className='text-left p-2 '>
                <div><h1 className='font-bold text-lg line-clamp-2'>{course.courseTitle}</h1></div>
                <p className='truncate'>{course.educator?.username}</p>
                <div className='text-sm flex space-x-2 items-center'>
                    <p>{calculateRating(course)}</p>
                    <div className='flex '>
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} className='w-4 h-4' />
                        ))}
                    </div>
                    <p>({course.courseRatings.length})</p>
                </div>
                <p>₹{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
            </div>
        </Link>

    )
}

export default CourseCard