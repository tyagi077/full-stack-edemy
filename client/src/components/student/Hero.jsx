import React from 'react'
import SearchBar from './SearchBar'
import { assets } from '../../assets/assets'

function Hero() {
  return (
    <div className='bg-linear-to-b from-[#DBF8FD] to-[#fffff] flex flex-col items-center justify-center w-full pt-20 small:pt-26 space-y-7 px-5 xs:px-8 small:px-10 sm:px-10 md:px-15 lg:px-20 xl:px-30 '>
        <h1 className='font-semibold leading-[34px] small:leading-[51.96px] text-[25px] small:text-[46px] w-full max-w-[420px]  small:max-w-[732px]  font-[Outfit] relative '>Empower your future with the Courses designed to <span className='text-[#2563EB]'>fit your choice.</span><img  src={assets.sketch} alt="sketch" className='hidden medium:flex absolute right-0'/></h1>
        <p className='text-[16px] text-[#565656] leading-[24px] w-full max-w-[560px] mx-auto font-[Outfit] hidden small:flex'>We bring together world-class instructors, interactive content, and a supportive
        community to help you achieve your personal and professional goals.</p>
        <p className='text-[13px] text-[#565656] leading-[24px] w-full max-w-[260px] mx-auto font-[Outfit] flex small:hidden'>We bring together world-class instructors to help you achieve your professional goals.</p>
        <SearchBar/>
    </div>
  )
}

export default Hero