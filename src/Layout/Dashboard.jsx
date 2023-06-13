import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
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

                    <li><Link to="/dashboard/myselected">My Selected Classes</Link></li>
                    <li><Link to="/dashboard/enrolled">Enrolled Classes</Link></li>
                    {/* <Link to="/dashboard/payment">Payment</Link> */}
                    <li><Link to="/dashboard/paymenthistory">Payment History</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;