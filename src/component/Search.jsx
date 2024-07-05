import React from 'react'
import youtube from '..//assets/youtube.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardVoice } from "react-icons/md";


function Search(allVideos) {
  const [videosRes, setVideosRes] = useState([])
  const [search, setSearch] = useState('')
  const [notFound, setNotFound] = useState(false)

  const clickSearch = () =>{
    setVideosRes([]);
    setNotFound(false);
    
    if (search !== '') {
      let filtering = allVideos.filter((s) => (
        s.title.toLowerCase().includes(search.toLowerCase())
      ));
  
      setVideosRes(filtering);
      setNotFound(filtering.length === 0);
    } else {
     
      setStudentsRes(students);
    }
}

const onChanging = ()=>{

}

  return (
    <div className='w-full'>
        <div className='w-full mt-1 flex  items-center '>
       <RxHamburgerMenu className='w-10 h-10 ml-[1.9rem]'  size={38}/>
       <img src={youtube} className='w-14 h-12 ml-4 '></img>
       <h1 className='font-medium text-[1.3rem] pl-3'>YouTube</h1>
        <div className='w-full flex pl-36'>
         <input placeholder='Search'  type='text' className='w-[60%] border-2 rounded-full py-1 pl-4 text-[1.3rem] items-center'>
          
         </input>
         <button ></button>
         <MdKeyboardVoice size={32} className='ml-4 mt-1'/>
        </div>
        
        </div>
    </div>
  )
}

export default Search
