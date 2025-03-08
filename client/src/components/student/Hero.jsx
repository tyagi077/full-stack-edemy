import React from 'react'
import SearchBar from './SearchBar'
import { assets } from '../../assets/assets'

function Hero() {
  return (
    <div className='bg-linear-to-b from-[#DBF8FD] to-[#fffff] flex flex-col items-center justify-center w-full pt-36 px-7 space-y-7 text-center'>
        <h1 className='text-center font-semibold leading-[51.96px] text-[46px] w-full max-w-[732px] mx-auto font-[Outfit] relative '>Empower your future with the Courses designed to <span className='text-[#2563EB]'>fit your choice.</span><img src={assets.sketch} alt="sketch" className='absolute -bottom-6 right-0'/></h1>
        <p className='text-[16px] text-[#565656] leading-[24px] w-full max-w-[560px] mx-auto font-[Outfit]'>We bring together world-class instructors, interactive content, and a supportive
        community to help you achieve your personal and professional goals.</p>
        <SearchBar/>
    </div>
  )
}

export default Hero