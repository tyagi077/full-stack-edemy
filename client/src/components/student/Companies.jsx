import React from 'react'
import {assets} from "../../assets/assets"
function Companies() {
  return (
    <div className='py-16'>
        <p className=''>Trusted by learners from</p>
        <div className='flex gap-14 mt-8 '>
            <img src={assets.microsoft_logo} alt="Microsoft" className='w-20 md:w-28' />
            <img src={assets.walmart_logo} alt="walmart" className='w-20 md:w-28' />
            <img src={assets.accenture_logo} alt="accenture" className='w-20 md:w-28' />
            <img src={assets.adobe_logo} alt="adobe" className='w-20 md:w-28' />
            <img src={assets.paypal_logo} alt="paypal" className='w-20 md:w-28' />
        </div>
    </div>
  )
}

export default Companies