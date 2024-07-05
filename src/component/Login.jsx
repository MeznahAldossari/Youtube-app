import React, {useState } from 'react'
import google from "../assets/google.png"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Login() {
    const [user, setUser] = useState({
        username:'',
        password:''
    })

    const navigate = useNavigate()


    const [errText,setErrText] = useState([])


    const changeUserName =(e)=>{

        setUser({...user,"username": e.target.value})
        setErrText([])

    }
    const changePassword =(e)=>{
        setUser({...user, "password": e.target.value})
        setErrText([])
    }

    // useEffect(()=>{
    //     LoginUser()
    // }, [])

    const LoginUser = ()=>{

        let arr = []
        setErrText([])
        // console.log(user.username);
        if(user.username !=='' && user.password !==''){
            
            axios.get('https://665736969f970b3b36c8658a.mockapi.io/Products')
            .then(function (response) {
           
            const findUser = response.data.find((userInfo) => 
                userInfo.username === user.username && userInfo.password === user.password
            );

            console.log(findUser);
            if(findUser){
                localStorage.setItem("id", findUser.id)
                navigate("/")
            }else {

                setErrText(previous => [...previous,"The Data Not Found, Make Sure to Enter Correct Values"])
            }


            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });

        }else{
            setErrText(previous => [...previous,"Please Fill All Fields"])
        }

    }
  return (
    <div className='flex h-screen max-sm:h-auto max-sm:mt-14 justify-center items-center w-screen border-gray-200 '>
      

        <div className='flex w-[65%] max-sm:flex-col max-sm:w-full max-sm:h-screen pl-12 justify-center border-2 border-gray-200 rounded-lg h-[60vh] py-6'>
            <div className='w-[50%] max-sm:w-full  pl-24 max-sm:pl-0 flex flex-col justify-center'>
            <img src={google} className='w-24 '></img>
            <h2 className='text-[1.5rem] mt-4 pl-2 '>Sign in</h2>
            <h2 className='text-[1rem] mt-1 pl-2'>to continue to YouTube
            </h2>
            </div>

            <div className='flex flex-col justify-center items-center w-[50%] max-sm:w-[90%] max-sm:mt-6'>
            <input type="text" placeholder='Username' onChange={changeUserName} className='w-[85%] max-sm:w-[100%] py-2 pl-2 rounded-md'></input>
            <input type="password" placeholder='Password'  onChange={changePassword} className='w-[85%] max-sm:w-[100%] py-2 mt-2 pl-2 rounded-md'></input>
            <div className='w-[60%] max-sm:w-[95%] '>

                {errText.map((e, index) => (
                            <p key={index} className='text-[#C80036] text-[0.8rem]'>{e}</p>
                        ))}
                <p className='text-[0.8rem] mt-1'>Don't have an Account? <Link to="/signup"><span className='text-[#4b648b] underline text-[0.8rem]'> Sign Up</span></Link></p>
                <button className='px-6 py-1 mt-6 text-white bg-[#065fd4] rounded-full cursor-pointer' onClick={LoginUser}>Sign In</button>

                </div>
                   </div>
        </div>
       
       

    </div>
  )
}

export default Login
