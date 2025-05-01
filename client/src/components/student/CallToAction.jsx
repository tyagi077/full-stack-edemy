import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

function CallToAction() {

  return (
    <div className='flex flex-col space-y-4 items-center pb-24 pt-14  px-5 xs:px-8 small:px-10 sm:px-10 md:px-15 lg:px-20 xl:px-30'>
      <h1 className='text-[20px] small:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='hidden small:inline-block text-sm text-gray-500 '>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam <br /> aliqua proident excepteur commodo do ea.</p>
      <p className='inline-block small:hidden text-sm text-gray-500 '>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <Link to={'/course-list'} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
          className='w-24 small:text-[17px] small:w-40 bg-blue-500 text-white py-2 rounded-md'>Get started</Link>

        <button className='flex items-center gap-4 justify-center'>Learn more <img src={assets.arrow_icon} alt="" /></button>
      </div>
    </div>
  )
}

export default CallToAction