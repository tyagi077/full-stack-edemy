import React from 'react'
import { assets } from '../../assets/assets'

function CallToAction() {
  return (
    <div className='flex flex-col space-y-4 items-center pb-24 pt-14'>
        <h1 className='text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
        <p className='text-sm text-gray-500 '>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam <br /> aliqua proident excepteur commodo do ea.</p>
        <div className='flex items-center font-medium gap-6 mt-4'>
            <button className='w-40 bg-blue-500 text-white py-2 rounded-md'>Get started</button>
            <button className='flex items-center gap-4 justify-center'>Learn more <img src={assets.arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default CallToAction