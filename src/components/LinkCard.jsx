/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'

const  LinkCard=forwardRef(({shortUrl,redirectUrl,analytics},ref) =>
  {return (
    <div ref={ref} className='flex justify-between bg-purple-400 w-[100%] py-2 px-4 rounded-md sm:flex text-black sm:justify-between  overflow-x-auto font-sans mt-2 scrollbar-thin   scrollbar-thumb-purple-600 scrollbar-track-purple-300 scrollbar-thumb-rounded scrollbar-track-rounded '>
      <div className=' gap-2 sm:gap-4 '>
        <p>{redirectUrl}</p>
        <p className='font-bold'>https://sh-lcjg.onrender.com{shortUrl}</p>
      </div>
      <div>
        <p className='font-bold'>visits:{analytics}</p>
        </div>
    </div>
  )}
);
LinkCard.displayName='LinkCard'
export default LinkCard