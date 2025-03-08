import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className=' bg-[#111820] text-white py-4 px-40'>
            <div className='grid grid-cols-3 text-start border-b border-[#93979A] mb-4 py-10 '>
                <div className=' flex flex-col gap-6  '>
                    <img className='w-20' src={assets.logo_dark} alt="" />
                    <p className='text-[#93979A]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                </div>
                <div className='flex flex-col gap-6 m-auto'>
                    <h2 className=''>Company</h2>
                    <div>
                        <ul className='text-[#CFD1D2] flex flex-col gap-4'>
                            <li><Link>Home</Link></li>
                            <li><Link>About us</Link></li>
                            <li><Link>Contact us</Link></li>
                            <li><Link>Privacy policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Subscribe to our newsletter</h2>
                    <p className='text-[#CFD1D2]'>The latest news, articles, and resources, sent to your inbox weekly.</p>

                    <div className=' flex justify-between w-100 gap-2'>
                        <input className='bg-[#1F2937] py-2 border rounded-md px-4 border-[#1F2937] w-full ' type="email" placeholder='Enter your email' />
                        <button className='px-5 rounded-md bg-blue-500 py-1'>Subscribe</button>
                    </div>
                </div>
            </div>
            <p className='text-[#93979A] text-center'>Copyright 2024 © Edemy. All Right Reserved.</p>
        </div>
    )
}

export default Footer