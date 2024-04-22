/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'

const  LinkCard=forwardRef(({shortUrl,redirectUrl,analytics},ref) =>
  {return (
    <div ref={ref} className=' bg-purple-400 w-[100%] py-2 px-2 sm:px-4 rounded-md sm:flex text-black sm:justify-between  overflow-x-auto font-sans mt-2 scrollbar-thin   scrollbar-thumb-purple-600 scrollbar-track-purple-300 scrollbar-thumb-rounded scrollbar-track-rounded '>
      <div className=' gap-2 sm:gap-4 '>
        <p>{redirectUrl}</p>
        <a href={import.meta.env.VITE_BASE_API_URL/shortUrl} className=' font-bold text-sm md:text-base lg:text-lg'>{import.meta.env.VITE_BASE_API_URL}/{shortUrl}</a>
      </div>
      <div>
        <p className='font-bold text-sm'>visits:{analytics}</p>
        </div>
    </div>
  )}
);
LinkCard.displayName='LinkCard'
export default LinkCard