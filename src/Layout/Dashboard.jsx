import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Utilities/useAdmin";
import useInstructor from "../Utilities/useInstructor";


const Dashboard = () => {

    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-2" className=" text-cyan-400 z-50 font-bold drawer-button lg:hidden"> <FaArrowRight></FaArrowRight> </label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side mt-20 lg:mt-0">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full font-bold bg-base-200 text-base-content">

                    {
                        isAdmin ? <>
                            <label htmlFor="my-drawer-2" className=" text-cyan-400 z-50 font-bold drawer-button lg:hidden"> <FaArrowLeft></FaArrowLeft> </label>
                            <li><Link to="/dashboard/admin">Admin</Link></li>
                            <li><Link to="/dashboard/manageclasses">Manage Classes</Link></li>
                            {/* <Link to="/dashboard/payment">Payment</Link> */}
                            <li><Link to="/dashboard/allusers">Manage Users</Link></li>
                        </> : <>
                            {
                                isInstructor ? <>
                                    <label htmlFor="my-drawer-2" className=" text-cyan-400 z-50 font-bold drawer-button lg:hidden"> <FaArrowLeft></FaArrowLeft> </label>
                                    <li><Link to="/dashboard/instructor">Instructor</Link></li>
                                    <li><Link to="/dashboard/addclasses">Add A Class</Link></li>
                                    {/* <Link to="/dashboard/payment">Payment</Link> */}
                                    <li><Link to="/dashboard/instructorsclasses">My Classes</Link></li>

                                </> : <>
                                    <label htmlFor="my-drawer-2" className=" text-cyan-400 z-50 font-bold drawer-button lg:hidden"> <FaArrowLeft></FaArrowLeft> </label>
                                    <li><Link to="/dashboard/myselected">My Selected Classes</Link></li>
                                    <li><Link to="/dashboard/enrolled">Enrolled Classes</Link></li>
                                    {/* <Link to="/dashboard/payment">Payment</Link> */}
                                    <li><Link to="/dashboard/paymenthistory">Payment History</Link></li>

                                </>

                            }

                        </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;