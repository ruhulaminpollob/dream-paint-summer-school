
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../Providers/AuthProvider';

const useClasses = () => {
    const { user } = useContext(AuthContext)
    const token=localStorage.getItem('jwt-secret-token')

    const { isLoading,  data, refetch} = useQuery({
        queryKey:['classes', user?.email],
        queryFn: async() =>{
            const response= await fetch(`http://localhost:5000/myclasses?email=${user.email}`, { headers:{
                authorization:`bearer:${token}`
            }})
            return response.json()
        } ,
    
    })
    // console.log(data);
    return [data, isLoading, refetch]


   
};

export default useClasses;