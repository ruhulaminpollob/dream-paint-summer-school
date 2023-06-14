import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Shared/Loading/Loading";
import useAdmin from "../Utilities/useAdmin";


const AdminRoute = ({children}) => {

    const {user , loading}=useContext(AuthContext)
    const [isAdmin, isAdminLoading]=useAdmin()
    const location=useLocation()
    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/"  state={{ from: location }} replace ></Navigate>
};

export default AdminRoute;