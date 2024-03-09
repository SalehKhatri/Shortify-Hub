import React, { useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import LinkCard from './LinkCard';
import { urls } from '../Utils/Redux/urlSlice';
import { fetchAllUrls } from '../Utils/Redux/urlSlice';
import FlipMove from 'react-flip-move';
import ClipLoader from "react-spinners/ClipLoader";
function AllLinks() {
  const dispatch=useDispatch()
  const allLinks=useSelector(urls)

  useEffect(()=>{
    dispatch(fetchAllUrls())
  },[])

  

  return (
    
    <div className='text-white flex flex-col gap-2 mt-4 w-[90%] sm:w-[70%] border border-purple-400 shadow-[0_0_23px_1px_rgba(192,132,252,0.3)] rounded-md  p-[6px] sm:p-5 h-[25vh] scrollbar-thin   scrollbar-thumb-purple-600 scrollbar-track-purple-300 scrollbar-thumb-rounded scrollbar-track-rounded overflow-y-auto '>
      <p className='text-purple-700 font-bold font-sans text-lg '>Your Links:</p>
     { 
     allLinks.isLoading?<div className='flex justify-center'> <ClipLoader color='#c084fc' size={45} /></div>:
      <FlipMove>
    {!allLinks.urls?.length?<div className='flex justify-center'><h1 className='text-purple-500 font-bold'>Nothing to display! Try shortening a url</h1></div>
    
    :allLinks.urls?.map((item,index)=>{
      return <LinkCard key={index} shortUrl={item.shortId} redirectUrl={item.redirectURL} analytics={item?.visitHistory?.length} />
    })}
     </FlipMove>}
    </div>
  )
}

export default AllLinks