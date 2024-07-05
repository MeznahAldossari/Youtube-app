import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Like from '../assets/like.png'
import Nav from './Nav'
import Search from './Search'
import youtube from '../assets/youtube.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardVoice } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";




function Favoritelist() {
    let myUser = localStorage.getItem("id")
    const [myLikes, setMyLikes] = useState([])
    const {id} = useParams()


    useEffect(()=>{
        getMyLikes()

    },[])

    const getMyLikes = ()=>{
      console.log("hello to the Fav Page")

        axios.get(`https://665736969f970b3b36c8658a.mockapi.io/Products/${id}`).then((res)=>{
           let myVideos = res.data.likes 
           console.log("hello to the Fav Page 2 "+ myVideos)
          let TrueValue = myVideos.filter((e)=> e.status == true)

          console.log(TrueValue)
           axios.get('https://665736969f970b3b36c8658a.mockapi.io/form').then((res2)=>{
            let arr = []
            res2.data.forEach((user)=>{
              console.log("hello")
              user.items.forEach((e2)=>{
                let finding = TrueValue.find((obj)=> obj.videoId === e2.id)
                if(finding && finding !== undefined){
                  console.log("hello Lady")
                  arr.push({"id": e2.id, "title": e2.snippet.title, "views": e2.statistics.viewCount,
                    "likes":finding.status ,
                    "comments": e2.statistics.commentCount
                 })


                }
                
              })
              console.log(arr)
              setMyLikes(arr)
              // user.item.filter((e)=> e.id ===)
            })
           })

        //    if(videoStatus.videoId)
        })



    }
  return (
    <div><div className='w-full h-16 bg-white'>
    <div className='w-full'>
  <div className='w-full mt-1 flex  items-center '>
 <RxHamburgerMenu className='w-10 h-10 ml-[1.9rem] max-sm:hidden  max-sm:ml-[2px]'  size={38}/>
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
  </div>
  
  </div>
</div>
  </div>























<div className='w-[100%] flex mt-0  items-center  h-auto'>


  
  
<div className='max-sm:full '>
      <div className='flex justify-between max-sm:w-full max-sm:justify-center'>
     <div className='h-screen fixed mt-2 max-sm:hidden'>
        <Nav/>
      </div >
            <div className='w-[90%] mt-6 ml-24 max-sm:ml-0' >
            <h1 className='text-[1.5rem] max-sm:text-[1rem] ml-10 max-sm:ml-0 font-bold  text-left mb-6'>Liked Video</h1>
            {myLikes.map((e,index)=>(
                <Link to={`/videoInfo/${e.id}`} className='w-full flex items-center justify-center' key={index} >
                  
                  <div  className='h-auto items-end mt-2 justify-center  j]ustify-between   flex w-full rounded-lg cursor-pointer'>
                  <div className=''>                  
                    <iframe width="250" height="200" className='rounded-md max-sm:w-[10rem] max-sm:h-[30vh]' src={`https://www.youtube.com/embed/${e.id}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
                     <div className='w-[70%]  flex justify-between h-32 ml-4 flex-col'> 
                      <h3 className='text-black text-[0.8rem] pl-4 pt-2'>{e.title}</h3>
                   

                     </div>
                     
</div>
               </Link>
            ))}

            </div>
            
           
          </div>
            

          </div></div>
    </div>
  )
}

export default Favoritelist
