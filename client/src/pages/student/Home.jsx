import React, { useState } from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialSection from '../../components/student/TestimonialSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'
import { Outlet } from 'react-router-dom'

function Home() {

  return (
    <div  className='flex flex-col items-center text-center space-y-7'>
        <Hero/>
        <Companies/>
        <CoursesSection/>
        <TestimonialSection/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Home