import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between py-3 px-6 bg-white shadow-md border-b border-gray-200">
        
        {/* Logo */}
        <img className="w-[120px] md:w-[150px] object-contain" src={assets.logo} alt="Logo" />

        {/* Logout Button */}
        <button onClick={() => setToken('')} className="bg-[#48b36b] text-white px-5 py-2 sm:px-6 sm:py-2 rounded-full text-sm shadow-md 
        hover:bg-[#3ca05e] transition-all duration-300">
          Logout
        </button>

    </div>
  )
}

export default Navbar
