import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Search from './Search'
import youtube from '..//assets/youtube.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardVoice } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { IoIosSearch } from "react-icons/io";



function Home() {
  const videoURL = 'https://665736969f970b3b36c8658a.mockapi.io/form'
  const [videos, setVideo] =useState([])
  const [searching, setSearching] = useState([])
  const [searchValue, setSearchValue] = useState('')
 const getLocal = localStorage.getItem("id")
  useEffect(()=>{
    getAllVideos()
  },[])

  const getAllVideos = ()=>{
    let arr = []
    axios.get(videoURL).then((res)=>{
      

      console.log("this is results"+res.data)

      // res.data.items.map((video)=>{
   
      //     arr.push({"id":video.id, "title":video.snippet.title, "description":video.snippet.description})  
      // })

      // setVideo(arr)

        res.data.forEach((e)=>{
          e.items.forEach((e2)=>{

          arr.push({"id":e2.id, "title":e2.snippet.title, "description":e2.snippet.description,"views": e2.statistics.viewCount})  


          })
        })
    setVideo(arr)





     
    })

  

  }

  const searchData =()=>{
   
    if(searchValue !=='' && searchValue !==undefined && searchValue.trim() !==''){
      
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchValue}&surfing&type=video&key=AIzaSyCeRE6LtSwaa7ih2i98el78nGNXHatKm_Q`).then((e)=>{
        setSearching(e.data.items)



      })
     
      
    }
  }
  return (
    <div className='w-full'>

<div className='w-full h-16 bg-white'>
         <div className='w-full'>
        <div className='w-full mt-1 flex  items-center '>
          <Link to="/">
          <RxHamburgerMenu className='w-10 h-10 ml-[1.9rem] max-sm:hidden  max-sm:ml-[2px]'  size={38}/>
          </Link>
          <Link to="/">
       <img src={youtube} className='w-9 h-10 ml-4 '></img>
          </Link>
      
          <h1 className='font-medium text-[1.3rem] pl-6'>YouTube</h1>
       
       <div className='w-full flex max-sm:justify-between pl-36 max-sm:pl-4'>
       <input placeholder='Search' onChange={()=>{setSearchValue(e.target.value)}}  type='text' className='w-[60%] max-sm:w-[80%] border-2 rounded-full py-1 max-sm:py-0 pl-4 max-sm:[1rem] text-[1.3rem] items-center'>
          
          </input>
          <div className='rounded-full py-1 bg-slate-100 ml-2 flex justify-center'>
           <button onClick={()=>{searchData()}} className='rounded-full  items-center border-gray-200 font px-2 py-1 text-[0.7rem] bg-slate-100 '>         
             <IoIosSearch size={25}/>
           </button>
 
 
           </div>
          
          
          <div className='rounded-full py-1 bg-slate-100 ml-2 flex justify-center'>
          <button className='rounded-full  items-center border-gray-200 font px-2 py-1 text-[0.7rem] bg-slate-100 '>         
            <MdKeyboardVoice size={25} className=' '/>
          </button>


          </div>
         {!getLocal? (
          <>
           <div  className=' grow flex justify-end pr-10 max-sm:hidden'> 

           <Link to={'/login'}>
           <button className='py-1  text-[1.2rem] px-12 border-gray-200 rounded-full float-right border-2 hover:bg-[#c1d7f3] '>Login</button>
 
           </Link>        
          </div>
          </>
         ):<>
        
         </>}
        

        </div>
        
        </div>

    </div>
        
        </div>
     <div className='flex justify-between max-sm:w-full max-sm:justify-center'>
     <div className='h-screen fixed mt-4 max-sm:hidden'>
        <Nav/>
      </div>
      <div className='w-full'>
        {searching.length === 0?(
          <>
              <div className='flex justify-center items-center  ml-32  max-sm:ml-0 max-sm:mr-0 mt-4 max-sm:w-full '>
        
        <div className='grid grid-cols-3 max-sm:flex max-sm:flex-col max-sm:justify-center place-content-center   gap-2 gap-y-12 max-sm:w-full'>
         
          {videos.map((single, index)=>(
          
           <Link to={`/videoInfo/${single.id}`}>
            <div key={index} className='rounded-lg max-sm:w-full  max-sm:h-auto  w-[29vw] h-[48vh] mt-12 cursor-pointer max-sm:mt-6'>
           <iframe width="350" height="250" className='rounded-md max-sm:w-full max-sm:h-[40vh]' src={`https://www.youtube.com/embed/${single.id}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div className='h-12 flex w-[94%] justify-center items-center gap-4 flex-row-reverse'>
            <h3 className='mt-2 w-[90%] text-right text-[0.8rem]'>{single.title}</h3>
            <HiOutlineDotsVertical  />


            </div>
            <h3 className='text-[0.85em] text-gray-500 mt-2 '>{single.views} views</h3>

            </div>
            </Link>

         
           
          ) )}

        

          </div>
      </div>
          </>

        ):(
          <>
          <div className='flex justify-center items-center ml-32   mt-12'>

        
        <div className='flex flex-col w-full  mt-12 gap-2 gap-y-12'>
         
          {searching.map((single, index)=>(
            
          
           <Link to={`/videoInfo/${single.id.videoId}`}>
            {console.log(single.snippet.channelId)}
            <div key={index} className='rounded-lg flex h-[48vh] mt-0 cursor-pointer w-[90%]'>
           <iframe width="700" height="300" className='rounded-md' src={`https://www.youtube.com/embed/${single.id.videoId}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div className='h-10 flex flex-col  w-full items-center'>

            <h3 className='mt-2 w-[90%]  text-[1.1rem] pl-12'>{single.snippet.title}</h3>
            
            </div>
           <div>
           <HiOutlineDotsVertical  size={20} />
           </div>
          
           


            </div>
            </Link>

         
           
          ) )}

        

          </div>
      </div>
      
          </>

        ) }
      {/* <div className='flex justify-center items-center ml-32  mt-12'>
        
        <div className='grid grid-cols-3 place-content-center   gap-2 gap-y-12'>
         
          {videos.map((single, index)=>(
          
           <Link to={`/videoInfo/${single.id}`}>
            <div key={index} className='rounded-lg w-[29vw] h-[48vh] mt-12 cursor-pointer'>
           <iframe width="350" height="250" className='rounded-md' src={`https://www.youtube.com/embed/${single.id}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div className='h-10'>
            <h3 className='mt-2 w-[90%] text-right'>{single.title}</h3>


            </div>
            <h3 className='text-[0.85em] text-gray-500 mt-2'>{single.views} views</h3>

            </div>
            </Link>

         
           
          ) )}

        

          </div>
      </div> */}
        </div>

     </div>
      
     
      
    </div>
  )
}

export default Home
