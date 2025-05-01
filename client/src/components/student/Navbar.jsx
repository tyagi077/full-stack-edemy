import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import axios from "axios"
import { toast } from 'react-toastify';
function Navbar() {
    const isCourseListPage = location.pathname.includes('/course-list');
    const { navigate, user ,setUser,BASE_URL } = useContext(AppContext)

    const handleCreateAccount = () => {
        navigate("/sign-up")
    }

    const becomeEducator = async() => {
        const token = localStorage.getItem("token")
        if (!token) return;
        try {
            const response = await axios.put(`${BASE_URL}/api/v1/user/update`,{
                isEducator:true
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.data.success){
                toast.success("Congratulations! You are now an educator.")

                setUser((prevUser)=>({
                    ...prevUser,
                    isEducator:true
                }))

            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
         }
    }

   

    return (
        <div className={`border-b border-[#A6B7C1] flex justify-between items-center ${isCourseListPage ? 'bg-white' : 'bg-[#DBF8FD]'} py-4  px-5 xs:px-8 small:px-10 sm:px-10 md:px-15 lg:px-20 xl:px-30`}>
            <img onClick={() => navigate("/")} src={assets.logo} alt="" className='cursor-pointer w-20' />
            <div className='hidden small:flex gap-4 items-center'>
                {user ? <ul className='flex text-md gap-4'>
                    <li className=' pr-4 border-r border-[#A6B7C1]'
                    >
                        <button onClick={() => {
                            if (user.isEducator) {
                                navigate('/educator');
                                scrollTo(0, 0);
                            } else {
                                becomeEducator();
                            }
                        }
                        }>{user?.isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                    </li>
                    <li><Link to="/my-enrollments">My Enrollments</Link></li>
                </ul> : <ul className='flex text-sm gap-4'>
                    <li className=' pr-4 border-r border-[#A6B7C1]'><Link to="#">Add Course</Link></li>
                    <li><Link to="/sign-in">Login</Link></li>
                </ul>}
                {user ? (
  user?.imageUrl ? (
    <img
      onClick={() => navigate()} 
      src={user.imageUrl} 
      alt="User"
      className="w-6 h-6 rounded-full cursor-pointer"
    />
  ) : (
    <img
      onClick={() => navigate("/profile")}
      src={assets.profile_img}
      alt="Default Profile"
      className="w-6 h-6 rounded-full cursor-pointer"
    />
  )
) : (
  <button
    onClick={handleCreateAccount}
    className="bg-[#2563eb] text-white rounded-2xl px-4 py-1 text-sm"
  >
    Create Account
  </button>
)}

            </div>

            <div className=' gap-4 flex small:hidden'>
                {user?.imageUrl?<img onClick={()=>navigate()} src={user.imageUrl} alt="" className='w-6 h-6' />:<img onClick={()=>navigate("/profile")} src={assets.profile_img} alt="" className='w-6 h-6' />}
            </div>
        </div>
    )
}

export default Navbar