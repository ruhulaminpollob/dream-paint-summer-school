

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
import Admin from "../Pages/Dashboard/Admin";
import AllUsers from "../Pages/Dashboard/AllUsers";
import ManageClasses from "../Pages/Dashboard/ManageClasses";
import InstructorsClasses from "../Pages/Dashboard/InstructorsClasses";
import AddClasses from "../Pages/Dashboard/AddClasses";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import Feedback from "../Pages/Dashboard/Feedback";

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
              path:'admin',
              element:<AdminRoute><Admin></Admin></AdminRoute>
            },
            {
              path:'manageclasses',
              element:<AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
              path:'allusers',
              element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
              path:'feedback/:id',
              element:<Feedback></Feedback>,
              loader:({params})=>fetch(`http://localhost:5000/singleclass/${params.id}`)
              
            },
            {
              path:'instructor',
              element:<InstructorRoute><Instructors></Instructors></InstructorRoute>
            },
            {
              path:'instructorsclasses',
              element:<InstructorRoute><InstructorsClasses></InstructorsClasses></InstructorRoute>
            },{
              path:'addclasses',
              element:<InstructorRoute><AddClasses></AddClasses></InstructorRoute>
            },
            
            {
              path:'myselected',
              element:<MySelectedClasses></MySelectedClasses>
            },
            {
              path:'enrolled',
              element:<MyEnrolledClasses></MyEnrolledClasses>
            },
            {
              path:'payment/:id',
              element:<Payment></Payment>,
              loader:({params})=>fetch(`http://localhost:5000/payment/${params.id}`)
              
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