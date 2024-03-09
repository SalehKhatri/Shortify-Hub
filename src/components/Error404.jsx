import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { darkMode } from '../Utils/Redux/darkModeSlice'

function Error404() {
  return (
    <div className='text-white '>
      <div className='flex flex-col items-center justify-center'>
      <h1 className=' sm:text-[128px] text-[94px] font-semibold tracking-wider text-purple-400'>404</h1>
      <p className= {`${useSelector(darkMode)?"text-white":"text-black"} text-[20px] sm:text-[40px]`}>OOPS! PAGE <span className='bg-purple-400 text-black px-3 rounded-lg mx-2 sm:mx-5 '>NOT</span> FOUND</p>
      </div>
      <div className='flex  justify-center'>
      <NavLink to='/' className=' px-5 py-3 rounded-md  bg-purple-400 hover:bg-purple-500 sm:mt-10 cursor-pointer text-black text-lg font-bold'>RETURN HOME</NavLink>
      </div>
    </div>
  )
}

export default Error404