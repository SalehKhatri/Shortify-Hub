import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { darkMode, setDarkMode } from '../Utils/Redux/darkModeSlice';

function Navbar() {

  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSignOut=()=>{
    localStorage.removeItem("token")
    navigate('/login')
  }
  const [isDarkMode,setIsDarkMode]=useState(useSelector(darkMode))
  const toggleDarkMode=()=>{
    setIsDarkMode(!isDarkMode)
    dispatch(setDarkMode(!isDarkMode))
  }

  return (
    <div className=' top-0 left-0 w-[100%]  '>
      <div className=' flex justify-between items-center py-4 px-6'>

      <button onClick={handleSignOut} className='bg-purple-400 p-2 font-sans font-semibold rounded-md hover:bg-purple-500 '>Logout</button>

      <DarkModeSwitch
      size={30}
      checked={isDarkMode}
      onChange={toggleDarkMode}
    />

      </div>
    </div>
  )
}

export default Navbar