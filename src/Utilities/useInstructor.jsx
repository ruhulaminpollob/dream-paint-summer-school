import { useContext } from "react"
import { useQuery } from "react-query"
import { AuthContext } from "../Providers/AuthProvider"
import useAxiosSecure from "./useAxiosSecure"

const useInstructor=()=>{
    const {user}=useContext(AuthContext)
    const [axiosSecure]=useAxiosSecure();
    const {data:isInstructor, isLoading:isInstructorLoading}=useQuery({
        queryKey:['isInstructor', user?.email],
        enabled: !! user,
        queryFn: async () => {
            const res =await axiosSecure.get(`/user/admin/${user?.email}`)
            return res.data.admin;
        }
    })
    return [isInstructor, isInstructorLoading]
}
export default useInstructor