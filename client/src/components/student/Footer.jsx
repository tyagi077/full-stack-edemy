import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className=' bg-[#111820] text-white py-4  px-5 xs:px-8 small:px-10 sm:px-10 md:px-15 lg:px-20 xl:px-30'>
            <div className='grid grid-cols-1 gap-14 medium:grid-cols-3 text-start border-b border-[#93979A] mb-4 py-10 '>
                <div className=' flex flex-col gap-6 items-center '>
                    <img className='w-20' src={assets.logo_dark} alt="" />
                    <p className='text-[#93979A] text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                </div>
                <div className='flex flex-col gap-2 m-auto text-center'>
                    <h2 className=''>Company</h2>
                    <div>
                        <ul className='text-gray-400 flex medium:flex-col gap-4 text-[14px] xs:text-[16px] '>
                            <li><Link>Home</Link></li>
                            <li><Link>About us</Link></li>
                            <li><Link>Contact us</Link></li>
                            <li><Link>Privacy policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='hidden medium:flex flex-col gap-6'>
                    <h2>Subscribe to our newsletter</h2>
                    <p className='text-[#CFD1D2]'>The latest news, articles, and resources, sent to your inbox weekly.</p>

                    <div className=' flex justify-between  gap-2'>
                        <input className='bg-[#1F2937] py-2 border  rounded-md px-3 border-[#1F2937] w-full max-w-80 ' type="email" placeholder='Enter your email' />
                        <button className=' rounded-md bg-blue-500  px-2 py-1'>Subscribe</button>
                    </div>
                </div>
            </div>
            <p className='text-[#93979A] text-center'>Copyright 2024 © Edemy. All Right Reserved.</p>
        </div>
    )
}

export default Footer