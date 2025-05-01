import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

function SearchBar({data}) {
  
  const navigate = useNavigate()
  const [input,setInput]=useState(data?data:'')

  const onSearchHandler=(e)=>{
    e.preventDefault()
    navigate("/course-list/"+input)
  }

  return (
    <form onSubmit={onSearchHandler} className='flex gap-2  border border-[#e4e7e9] bg-white rounded h-10 small:h-12 items-center w-full max-w-lg'>
      <img src={assets.search_icon} alt="search_icon" className='flex items-center size-3.5 small:size-5 md:w-auto ml-1'/>
      <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='py-2 text-sm small:text-base w-full focus:outline-none' />
      <button type='submit' className=' bg-blue-600 rounded text-white px-4 py-1 mx-1 small:mx-2 small:px-10 small:py-2 '>Search</button>
    </form>
  )
}

export default SearchBar