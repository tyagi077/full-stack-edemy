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
    <form onSubmit={onSearchHandler} className='flex  border border-[#e4e7e9] bg-white rounded h-12 items-center w-full max-w-lg'>
      <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-3'/>
      <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='py-2 w-full focus:outline-none' />
      <button type='submit' className=' bg-blue-600 rounded text-white px-10 py-2 mx-1'>Search</button>
    </form>
  )
}

export default SearchBar