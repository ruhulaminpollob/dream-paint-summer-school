
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useClasses = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure]= useAxiosSecure()
    const { isLoading,  data, refetch} = useQuery({
        queryKey:['classes', user?.email],
        queryFn: async() =>{
            const response= await axiosSecure(`/myclasses?email=${user.email}`)
            return response.data;
        } ,
    
    })
    // console.log(data);
    return [data, isLoading, refetch]


   
};

export default useClasses;