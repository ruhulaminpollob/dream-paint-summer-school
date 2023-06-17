import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const Admin = () => {
    const { user ,loading} = useContext(AuthContext)
    if (loading) {
        return
    }
    
    return (
        <div>
            <Helmet>
                <title>Dream Paint-Admin</title>
            </Helmet>
            {


               user && <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={user?.photoURL} className="w-40 rounded-full shadow-2xl" />
                        <div>
                            <h1 className="text-5xl font-bold">{user.displayName}</h1>
                            <p className="py-6">Admin of Dream Paint summer school, calefonia</p>
                            <Link to='/dashboard/manageclasses' className="btn btn-info text-white">Manage Class</Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Admin;