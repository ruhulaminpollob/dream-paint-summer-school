

import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Classes from "../Pages/Classes/Classes";
import Home from "../Pages/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import CreateUsers from "../Users/CreateUsers";
import Login from "../Users/Login";
import PrivateRoutes from "./PrivateRoutes";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<CreateUsers></CreateUsers>
        },
        {
          path:'/instructors',
          element:<PrivateRoutes><Instructors></Instructors></PrivateRoutes>
        },
        {
          path:'/classes',
          element:<Classes></Classes>
        }
      ]
    },
  ]);

  export default router;