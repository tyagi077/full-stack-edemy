import React, { useContext } from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
function NavBar() {
  const educatorData = dummyEducatorData

  const {user} =useContext(AppContext)
  return (
    <div className='flex items-center justify-between px-8 border-b border-gray-500 py-3'>
     <Link to="/"> <img src={assets.logo} alt="" className='w-20' /></Link>
   <div className='flex items-center gap-5 text-gray-500 relative'>
    <p>Hii! {user? user.username :'Developers'}</p>
    {user?.imageUrl? <img src={user.imageUrl} alt="" /> : <img src={assets.profile_img} className='w-6'/> }
   </div>
    </div>
  )
}

export default NavBar