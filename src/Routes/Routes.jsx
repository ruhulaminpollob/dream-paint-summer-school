

import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Layout/Dashboard";
import Home from "../Pages/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import CreateUsers from "../Users/CreateUsers";
import Login from "../Users/Login";
import PrivateRoutes from "./PrivateRoutes";
import MySelectedClasses from "../Pages/Dashboard/mySelectedClasses";
import MyEnrolledClasses from "../Pages/Dashboard/myEnrolledClasses";
import Payment from "../Pages/Dashboard/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";

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
        },
        {
          path:'/dashboard',
          element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
          children:[
            {
              path:'myselected',
              element:<MySelectedClasses></MySelectedClasses>
            },
            {
              path:'enrolled',
              element:<MyEnrolledClasses></MyEnrolledClasses>
            },
            {
              path:'payment',
              element:<Payment></Payment>
            },
            {
              path:'paymenthistory',
              element:<PaymentHistory></PaymentHistory>
            }
          ]
        }
      ]
    },
  ]);

  export default router;