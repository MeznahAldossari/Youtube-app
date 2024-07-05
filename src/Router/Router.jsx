import React from 'react'
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from '../component/Home';
import VideoDetails from '../component/VideoDetails';
import Login from '../component/Login';
import Subscribe from '../component/Subscribe';
import Favoritelist from '../component/Favoritelist';
import Signup from '../component/Signup';


function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/videoInfo/:id",
          element: <VideoDetails />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/favorites/:id",
          element: <Favoritelist />,
        },
        {
          path: "/signup",
          element: <Signup />,
        }
        
        
         
      ]);
    
  return (
    <div>
        <RouterProvider router={router} />

    </div>
  )
}

export default Router
