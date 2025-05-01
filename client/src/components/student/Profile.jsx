import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SkeletonCard from "./SkeltonCard";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function ProfilePage() {
    const {navigate,user,setUser}=useContext(AppContext)
    
  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/sign-in")
   toast.success("Logged out successfully!")
  };

  return user?(
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        {user?.imageUrl?<img src={user.imageUrl} alt="" className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"/>:<img  src={assets.profile_img} alt=""className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500" />}
          
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.username}</h2>
        <p className="text-gray-600">{user.email}</p>
        
        <button 
          onClick={handleLogout} 
          className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  ):<SkeletonCard/>;
}

export default ProfilePage;
