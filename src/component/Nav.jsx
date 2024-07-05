import React from 'react'
import { IoMdHome } from "react-icons/io";
import shorts from '../assets/shorts1.png'
import { MdOutlineSubscriptions } from "react-icons/md";
import { PiYoutubeLogoLight } from "react-icons/pi";
import youtube from '..//assets/youtube.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardVoice } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Nav() {
  let id = localStorage.getItem("id")
  const navigate = useNavigate()


  const logout = ()=>{
    localStorage.removeItem("id")
    navigate('/')

  }
  return (
    <div >
    <div className='flex flex-col h-screen  max-sm:hidden'>
       

       {/* <div className='w-full mt-1 flex  items-center '>
       <RxHamburgerMenu className='w-10 h-10 ml-[1.9rem]'  size={38}/>
       <img src={youtube} className='w-14 h-12 ml-4 '></img>
       <h1 className='font-medium text-[1.3rem] pl-3'>YouTube</h1>
        <div className='w-full flex pl-36'>
         <input placeholder='Search' type='text' className='w-[60%] border-2 rounded-full py-1 pl-4 text-[1.3rem] items-center'>
         
         </input>
         <MdKeyboardVoice size={32} className='ml-4 mt-1'/>
        </div>
        
        </div> */}
        <Link to={'/'}>
       <div className='flex  mt-6 flex-col w-[6vw] ml-2  items-center '>
        <IoMdHome size={22}/>
       
        <p className='text-[0.7rem]'>Home</p>

       </div>
       </Link>
       
       <div className='flex  mt-4 flex-col w-[6vw] ml-2  items-center cursor-pointer '>
        <img src={shorts} className='w-15 h-8'></img>
       
        <p className='text-[0.8rem]'>Home</p>

       </div>
       <Link to={`/favorites/${id}`}>
       <div className='flex  mt-4 flex-col w-[6vw] ml-2  items-center '>
       <MdOutlineSubscriptions size={22}/>
       
        <p className='text-[0.7rem]'>Subscriptions</p>

       </div>
       </Link>
      
       <div className='flex  mt-4 flex-col w-[6vw] ml-2  items-center '>
       <PiYoutubeLogoLight size={22}/>
       
        <p className='text-[0.7rem]'>You</p>

       </div>
       {id &&(
       
        
        <div className='flex  mt-4 flex-col w-[6vw] ml-2  items-center ' onClick={logout}>
         <PiYoutubeLogoLight size={22}/>
         
          <p className='text-[0.7rem]'>Logout</p>
  
         </div>
        
         

       )}
      

       </div>
       </div>
  )
}

export default Nav
