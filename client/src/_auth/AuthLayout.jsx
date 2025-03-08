import React from 'react'
import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'

function AuthLayout() {
  return (
    <div className='grid grid-cols-2 gap-2 bg-[#D9F6FB]'>
        <div className=''>
            <Outlet/>
        </div>
        <div className='h-full'>
        <img src={assets.mobile_hero_girl} alt="" className='w-full h-full object-cover'/>
        </div>
    </div>
  )
}

export default AuthLayout