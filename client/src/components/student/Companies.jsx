import React from 'react'
import { assets } from "../../assets/assets"
function Companies() {
  return (
    <div className='py-16  w-full  px-5 xs:px-8 small:px-10 sm:px-10 md:px-15 lg:px-20 xl:px-30 flex flex-col'>
      <p className=''>Trusted by learners from</p>
      <div className='mt-8 flex flex-wrap justify-center items-center gap-4 small:gap-5 md:gap-10 lg:gap-18  '>
        <div> <img src={assets.microsoft_logo} alt="Microsoft" className='w-full max-w-20 md:w-28' /></div>
        <div><img src={assets.walmart_logo} alt="walmart" className='w-full max-w-20 md:w-28' /></div>
        <div><img src={assets.accenture_logo} alt="accenture" className='w-full max-w-20 md:w-28' /></div>
        <div> <img src={assets.adobe_logo} alt="adobe" className='w-full max-w-20 md:w-28' /></div>
        <div><img src={assets.paypal_logo} alt="paypal" className='w-full max-w-20 md:w-28' /></div>
       
      </div>
    </div>
  )
}

export default Companies