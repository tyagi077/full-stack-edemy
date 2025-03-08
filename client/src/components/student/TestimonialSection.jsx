import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'
import { Link } from 'react-router-dom'

function TestimonialSection() {
  return (
    <div className='px-40'>
      <h2>Testimonials</h2>
      <p>Hear from our learners as they share their journeys of transformation, success, and how our <br /> platform has made a difference in their lives.</p>
      <div className='flex mt-10 w-4xl mb-10 gap-4' >
        {dummyTestimonial.map((testimonial,index)=>(
          <div key={index} className='border border-gray-500 '>
            <div className='text-start pb-2'>
           <div className='flex bg-[#F3F3F3] gap-4 p-4'>
           <div >
              <img className='w-12 h-12 rounded-full' src={testimonial.image} alt="" />
            </div>
            <div className=''>
              <h1 className='text-xl font-medium'>{testimonial.name}</h1>
              <p className=''>{testimonial.role}</p>
            </div>
           </div>
            <div className='px-4 py-1'>
              <div className='flex gap-1 pb-4'>
                 {[...Array(5)].map((_, i) => (
                            <img key={i} src={i <Math.floor(testimonial.rating)?assets.star:assets.star_blank} className='h-4' />
                          ))}
              </div>
              <p className='text-gray-500 '>{testimonial.feedback}</p>
            </div>
            <Link className='px-4 text-blue-500 underline' href="#">Read More</Link>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection