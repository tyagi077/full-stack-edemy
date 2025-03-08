import React from 'react'
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <div className='flex justify-between px-8 bg-white border-t border-gray-300 text-sm'>
      <div className='flex gap-2 items-center py-4'>
        <img src={assets.logo} alt="" className='w-20' />
        <div className='bg-gray-800 w-1 h-5'></div>
        <p>All right reserved. Copyright @Edemy</p>
      </div>

      <div className='flex gap-3'>
        <img src={assets.facebook_icon} alt="" className='w-8' />
        <img src={assets.twitter_icon} alt="" className='w-8'/>
        <img src={assets.instagram_icon} alt="" className='w-8'/>
      </div>
    </div>
  )
}

export default Footer