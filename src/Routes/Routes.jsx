

import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import CreateUsers from "../Users/CreateUsers";
import Login from "../Users/Login";

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
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signup',
            element:<CreateUsers></CreateUsers>
        }
      ]
    },
  ]);

  export default router;