import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {

    const instructor = false;
    const admin = true;
    const student=false
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full font-bold bg-base-200 text-base-content">

                    {
                        admin && <>

                            <li><Link to="/dashboard/admin">Admin</Link></li>
                            <li><Link to="/dashboard/manageclasses">Manage Classes</Link></li>
                            {/* <Link to="/dashboard/payment">Payment</Link> */}
                            <li><Link to="/dashboard/allusers">Manage Students</Link></li>

                        </>
                    }

                    {

                        instructor && <>

                            <li><Link to="/dashboard/instructor">Instructor</Link></li>
                            <li><Link to="/dashboard/addclasses">Add A Class</Link></li>
                            {/* <Link to="/dashboard/payment">Payment</Link> */}
                            <li><Link to="/dashboard/instructorsclasses">My Classes</Link></li>

                        </>
                    }

                    {
                       student && <>


                            <li><Link to="/dashboard/myselected">My Selected Classes</Link></li>
                            <li><Link to="/dashboard/enrolled">Enrolled Classes</Link></li>
                            {/* <Link to="/dashboard/payment">Payment</Link> */}
                            <li><Link to="/dashboard/paymenthistory">Payment History</Link></li>

                        </>
                    }





                </ul>

            </div>
        </div>
    );
};

export default Dashboard;