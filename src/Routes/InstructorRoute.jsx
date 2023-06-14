import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Shared/Loading/Loading";
import useInstructor from "../Utilities/useInstructor";


const InstructorRoute = ({children}) => {

    const {user , loading}=useContext(AuthContext)
    const [isInstructor, isInstructorLoading]=useInstructor()
    const location=useLocation()
    if (loading || isInstructorLoading) {
        return <Loading></Loading>
    }
    if (user && isInstructor) {
        return children
    }
    return <Navigate to="/"  state={{ from: location }} replace ></Navigate>
};

export default InstructorRoute;