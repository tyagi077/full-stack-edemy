import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';
import { Link } from 'react-router-dom';

function TestimonialSection() {
  return (
    <div className='py-10 px-5 xs:px-8 small:px-10 sm:px-10 md:px-15 lg:px-20 xl:px-30'>
      <h2 className='text-[18px] font-bold sm:text-[21px]'>Testimonials</h2>
      <p className='hidden md:inline-block'>
        Hear from our learners as they share their journeys of transformation, success, and how our <br /> 
        platform has made a difference in their lives.
      </p>
      <p className='md:hidden text-[13px] text-gray-600'>
        Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
      </p>

      {/* ✅ Ensuring Flex-Wrap Works Properly */}
      <div className='mt-10 mb-10 w-full flex flex-wrap justify-center gap-6'>
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className='sm:w-[48%] md:w-[30%] border border-gray-500 rounded-lg shadow-lg w-full max-w-80 min-w-60'>
            <div className='text-start pb-2'>
              <div className='flex bg-[#F3F3F3] p-4'>
                <div>
                  <img className='w-12 h-12 rounded-full' src={testimonial.image} alt="" />
                </div>
                <div className='ml-3'>
                  <h1 className='text-xl font-medium'>{testimonial.name}</h1>
                  <p className='text-gray-600'>{testimonial.role}</p>
                </div>
              </div>
              <div className='px-4 py-1'>
                <div className='flex gap-1 pb-4'>
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} className='h-4' />
                  ))}
                </div>
                <p className='text-gray-500'>{testimonial.feedback}</p>
              </div>
              <Link className='px-4 text-blue-500 underline' to="#">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialSection;
