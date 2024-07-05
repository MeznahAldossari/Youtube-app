import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import youtube from '../assets/youtube.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardVoice } from "react-icons/md";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SD from '../assets/bg.jpg'
import Search from './Search';
import Like from '../assets/like.png'
import user from '../assets/user.png'
import LikeIcon from '../assets/myLike.png'
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import people from '../assets/man.png'
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { comment } from 'postcss';



function VideoDetails() {
    const {id} = useParams()
    let userId = localStorage.getItem("id")
    const [mainVideo, setMainVideo] = useState({})
    const [videoList, setVideoList] = useState([])
    const [checkStatus, setCheckStatus] = useState({})
    const [myComment, setMycomments] = useState({})
    const [allComment, setAllcomments] = useState([])
    const [searching, setSearching] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [dis, setDis] = useState(false)
    const [HisLike, setHisLike] = useState(false)

    const navigate = useNavigate()
    // let videoURL = `https://665736969f970b3b36c8658a.mockapi.io/form/items/${id}`


    useEffect(()=>{
        viewSingViedo()
        getAllComments()
    },[])

    const viewSingViedo = ()=>{
     
        
        console.log(typeof id)

        console.log("videoID" + id)
        let arr = []
        let main = []

        axios.get('https://665736969f970b3b36c8658a.mockapi.io/form').then((res)=>{

            res.data.forEach((e)=>{
                e.items.forEach((e2)=>{
      
                    if(e2.id === id){

                      setMainVideo({"id": e2.id, "title": e2.snippet.title, "views": e2.statistics.viewCount,
                            "likes": e2.statistics.likeCount,
                            "comments": e2.statistics.commentCount,
                            "channelTitle":e2.snippet.channelTitle,
                            "description": e2.snippet.description

                          
                            
                         })

                    }else{
                        arr.push({"id": e2.id, "title": e2.snippet.title, "views": e2.statistics.viewCount,
                            "likes": e2.statistics.likeCount,
                            "comments": e2.statistics.commentCount,
                           
    
                         })
                    }      
      
                })
              })
              console.log(arr)
              // setMainVideo(main)
              setVideoList(arr)


        }).catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });



    }
  const AddLike = ()=>{

    axios.get(`https://665736969f970b3b36c8658a.mockapi.io/Products/${userId}`).then((res)=>{
      let arr = []
      arr = res.data.likes
      let len = arr.length
      console.log("my status:"+ HisLike)
      console.log("my status 2:"+ dis)

        if(HisLike){

        setHisLike(false)}
        else{
          if(dis){
            setDis(false)
            setHisLike(true)
          }else{
            setHisLike(true)
          }
          
        }
        

      // }else{
      //   if(dis === true){
      //     setDis(false)
      //     setHisLike(true)

      //   }
      //   setHisLike(true)
        
      // }
      
      
        // arr.forEach((e)=>{
        //   if(id == e.videoId){
            
        //   }
        // })

      let checkExists = arr.find((e)=> e.videoId ===id)
      console.log("checkExist:"+checkExists)
      if(!checkExists){
        arr.push({
          "id":String(len+1),
          "userid":userId,
          "videoId": id,
          "status":true
        })
       

      }else if(checkExists){


        arr = arr.map(myFav => {
          if (myFav.videoId === id && myFav.status ===true ) {
            
              return { ...myFav, status: false };
          }else if (myFav.videoId === id && myFav.status ===false ){
            
            return { ...myFav, status: true };
          }
          return myFav;
      });
  
      }

      console.log("this is my Arr"+ arr)
       
     
      

      axios.put(`https://665736969f970b3b36c8658a.mockapi.io/Products/${userId}`,{
        likes: arr
      }).then((res2)=>{
        console.log("Hello World")
        console.log(res2.data.likes)

     
      })
      
    })

  }

 

  const getAllComments=()=>{

    axios.get('https://665736969f970b3b36c8658a.mockapi.io/Products').then((res)=>{
     
      let UserCommetns = res.data.map((e)=>{
        
        let filertingRes = e.comments.filter((y)=>
          // console.log("uuuu"+ y.videoId)
          y.videoId === id
        )
        
        

        return filertingRes
      })
      console.log("testing all comments"+ JSON.stringify(UserCommetns))

      setAllcomments(UserCommetns)

      axios.get(`https://665736969f970b3b36c8658a.mockapi.io/Products/${userId}`).then((res)=>{
            let userLikes = res.data.likes.find((e)=> e.videoId === id)

            if(userLikes.status ===true && userLikes !==undefined){
              setHisLike(true)
              setDis(false)
            }else if (userLikes.status ===false && userLikes !==undefined) {
              setHisLike(false)
              if(dis== true){
                setDis(true)
              }
            }

          console.log("User LIKES"+userLikes)
      })

      

     
      
    
    })

    


  }
  const searchData=()=>{
    url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=surfing&type=video&key=AIzaSyCeRE6LtSwaa7ih2i98el78nGNXHatKm_Q'
    if(searchValue !=='' && searchValue !==undefined && searchValue.trim() !==''){

    }
  }

  const AdddisLike = ()=>{
    console.log("my status +++++++:"+ HisLike)
    console.log("my status 2:"+ dis)

    if(dis){

      setDis(false)}
      else{
        if(HisLike){
          setHisLike(false)
          setDis(true)
        }else{
          setDis(true)
        }
        
      }
  }

  const addComment = ()=>{

    if(myComment.hiscomment !==undefined && myComment !==''){
      console.log("Hello World")
     axios.get(`https://665736969f970b3b36c8658a.mockapi.io/Products/${userId}`).then((e)=>{
      let arr = []
      

        arr = e.data.comments
        let len = arr.length
      
        arr.push({
          "id":String(len+1),
          "userid":userId,
          "username":e.data.username,
          "videoId": id,
          "hisComments": myComment.hiscomment
        })

     


      // arr = e.data.comments
    
      // let len = arr.length
      // arr.push({
      //   "id":String(len+1),
      //   "userid":userId,
      //   "username":e.data.username,
      //   "videoId": id,
      //   "hisComments": myComment.hiscomment
      // })
      axios.put(`https://665736969f970b3b36c8658a.mockapi.io/Products/${userId}`,{
       comments:arr
      }).then((e2)=>{
         
      })
     })
    }

  }
 const deleteComments = (commentID, idUser)=>{
  
  console.log("the comment ID results =>"+ commentID)
  console.log("The comments arr"+ allComment)
  axios.get(`https://665736969f970b3b36c8658a.mockapi.io/Products/${userId}`).then((e)=>{
    let result = []
    result = e.data.comments
   
      let hisUserComment = result.filter(user => user.id !== commentID)
      console.log("allComments"+ hisUserComment.length)
      alert("The total: "+ hisUserComment.length)
      console.log("++++++++"+hisUserComment)
      axios.put(`https://665736969f970b3b36c8658a.mockapi.io/Products/${userId}`,{
        comments: hisUserComment
      }   
      )
      setAllcomments(hisUserComment)

      console.log()

  })
 }

//  const NextPage =(url)=>{
//   { 
    
//       window.open(url, '_blank');
   
//   }
  
 

 const EditComments = ()=>{
  
 }
  return (
    <div className='w-full '>
          <div className='w-full h-16 bg-white'>
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
        {/* <div className='flex h-screen'>
            <Nav/>
        </div> */}
      <div className='max-sm:full '>
      <div className='flex justify-between max-sm:w-full max-sm:justify-center'>
     <div className='h-screen fixed mt-2 max-sm:hidden'>
        <Nav/>
      </div>
        <div className='w-[90%] max-sm:mt-[10%]  max-sm:w-full  max-sm:flex-col  flex  justify-around max-sm:ml-0 max-sm:mr-0 ml-auto mr-auto '>

            <div className='w-50%   max-sm:w-screen max-sm:items-center  max-sm:mt-0 flex flex-col mt-[2%]   h-full'>
          
              {/* {mainVideo.map((e,index)=>( */}
                    <div className='h-auto  mt[-50%] max-sm:h-screen max-sm:flex max-sm:mt-[5%]  max-sm:flex-col max-sm:w-full rounded-lg mt-4'>

                    <iframe width="600" height="350" className='rounded-md  max-sm:w-full' src={`https://www.youtube.com/embed/${mainVideo.id}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <h3 className='text-[1.1rem]  pt-2 ml-4 max-sm:text-[0.9rem] font-medium'>{mainVideo.title}</h3>
                       <div>
                        </div>

                        <div className=' flex justify-between  gap-2 pb-2 mt-6'>
                          <div className='flex  items-center gap-4 font-medium'>
                          <img src={people} className='w-12'></img>
                          <p>{mainVideo.channelTitle}</p>

                          </div>
                          <div className='gap-12  flex justify-end items-center'>
                          <button className='rounded-full  border-none font-medium px-4 py-1 text-[0.8rem] text-white bg-black'>Subscribe</button>

                            <div>
                            <button className='' onClick={AddLike} ><AiOutlineLike size={25}  style={{backgroundColor:HisLike?"red": "white"}}/></button>
                            <button className='mr-4' onClick={AdddisLike} ><BiDislike size={25} style={{backgroundColor:dis?"gray": "white"}}/></button>

                              </div>
                            
                           
                          
                            {/* <button className='' onClick={disLike} >disLike</button> */}

                          </div>
                          
                          </div>

           </div>

           <div className='w-50% max-w-[47vw] max-sm:max-w-[96%] max-sm:w-full rounded-lg w-full mt-10 bg-[#edecec]'>
            <p className='font-medium mb-2 max-sm:w-full'>{mainVideo.views} Views</p>
            <p className='text-wrap break-all max-sm:w-full'>{mainVideo.description}</p>

           </div>

              {/* ))} */}

              <div className='mt-16 border-none h-auto max-sm:w-full max-sm:hidden'>

                <div>
                  <input type='text' onChange={(e)=>setMycomments({...myComment, "hiscomment": e.target.value})} className='w-full border-b-1 border-b-slate-300   pl-2  py-2 border-b-2 ' placeholder='Add a comment'></input>
                </div>
                <div>
                  <button className='px-6  rounded-full mr-2 mt-2 bg-[#065fd4] text-white py-2 float-right' onClick={addComment}>Comment</button>
                </div>
                <div className='w-full flex flex-col '>
                  <div className='mt-6'>
                 {allComment.map((e,index)=>(
                    <>
                    {e.map((e2)=>(
                      <>
                      <div key={index} className=' mt-1 pl-4 h-auto flex flex-col border-2 rounded-lg'>
                      <div className='flex gap-4 items-center w-full'>
                        <img src={user} className='w-12 mt-2'></img>
                        <h1 className='text-[1.1rem] font-medium'>@{e2.username}</h1>
                        <div className="dropdown dropdown-end flex justify-end mr-4  w-full">
                         <div tabIndex={0} role="button" className="">  <BsThreeDots  style={{ color:"black", width:"2vw", height:"3vh" }} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-32 p-2 shadow">
                          <button onClick={() => { deleteComments(e2.id, e2.userId) }} className='text-black'>Delete</button>
                          <button onClick={() => { EditComments(e2.videoId, e2.userid) }} className='text-black'>Edit</button>

              
                         </ul>
                        </div>
                        


                      </div>
                      <div className='pl-[4.5rem] flex flex-col'>
                      <h1 className='mt-[-10px]'>{e2.hisComments}</h1>
                       <div className='flex gap-4'>
                       <button className='float-right mt-4 mr-4 pb-2'><AiOutlineLike size={21} /></button>
                       <p className='text-[0.8rem] mt-4'>reply</p>

                       </div>
                      
                      </div>


                      {/* <p>{e2.hisComments}</p> */}
                      </div>
                      </>

                    ))}
                    
                       

                   
                   
                      </>
))}

                 
                    
                  </div>
             

                </div>

              </div>
             
            </div>
            <div className='w-[40%] mt-10 max-sm:mt-10 max-sm:w-full h-auto'>
              <div className='rounded-full w-full mb-6'>
                <img src='https://i.pinimg.com/564x/44/9d/ad/449dada7a0411061e603af33af18f05d.jpg' style={{width:"100%", height:"25vh"}} className='rounded-lg relative'/>
                <div className=' h-12 z-40 flex justify-around max-sm:w-full max-sm:mt-[185%] items-center font-medium w-[36%] bg-white absolute top-[36%] rounded-lg'>
                  <p>Connect the Software Developer</p>
                  <a className='px-2 py-1 bg-[#065fd4]   text-white rounded-full' href='https://www.linkedin.com/in/meznahaldossari/' target='_blank' >Connect</a>

                </div>

              </div>
            
            {videoList.map((e,index)=>(
                <Link to={`/videoInfo/${e.id}`} className='w-full  max-sm:mt-4' key={index} >
                  <div  className='h-[25vh] items-center max-sm:mt-12 justify-between mt-0  flex w-full rounded-lg cursor-pointer'>
                  <div className=''>                  
                    <iframe width="150" height="130" className='rounded-md  max-sm:w-42 ' src={`https://www.youtube.com/embed/${e.id}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
                     <div className='w-[70%] flex  justify-between h-32 ml-4 flex-col'> 
                      <div className='flex  flex-row-reverse'>
                      <HiOutlineDotsVertical className='float-end w-10'  />

                      <h3 className=' text-[0.8rem] pl-4 pt-2'>{e.title}</h3>

                      </div>
                      
                      <div>

                      <h3 className='text-[0.85em] text-gray-500 mt-2 pb-2'>{e.views} views</h3>


                      </div>

                     </div>
                     
</div>
               </Link>
            ))}
           
          </div>
            
        </div>
        </div>
        
  
           
           
        
      
    </div>
    </div>
  )
}

export default VideoDetails
