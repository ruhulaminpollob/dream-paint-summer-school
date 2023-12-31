
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Utilities/useAxiosSecure";


const AllUsers = () => {
    const [axiosSecure]=useAxiosSecure()
    // const [isDeleted, setIsDeleted]=useState(true)

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data
    })

    // make admin -----------

    const handleMakeAdmin = user => {

        fetch(`https://dream-paint-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {

                    refetch()
                    Swal.fire(
                        'Good job!',
                        `${user.name} is now admin`,
                        'success'
                    )

                }
            })
    }
    const handleMakeInstructor = user => {

        fetch(`https://dream-paint-server.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {

                    refetch()
                    Swal.fire(
                        'Good job!',
                        `${user.name} is now an Instructor`,
                        'success'
                    )

                }
            })
    }

    // delete user
    const handleDelete = user => {
        fetch(`https://dream-paint-server.vercel.app/users/${user._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    
                    refetch()
                    Swal.fire(
                        'Delete',
                        `${user.name} has been deleted`,
                        'success'
                    )
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Dream Paint-Manage Users</title>
            </Helmet>
            <h1 className="text-cyan-400 text-2xl md:text-4xl font-bold underline text-center py-10">Manage User</h1>
            <h3 className="text-3xl md:ml-10 ml-3 font-semibold my-4">Total Users: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{
                                    <button disabled={user.role === 'Admin'} onClick={() => handleMakeAdmin(user)} className={`btn btn-info text-white`} >Make Admin</button>
                                }</td>
                                <td>{
                                    <button disabled={user.role === 'Instructor'} onClick={() => handleMakeInstructor(user)}  className={`btn btn-info text-white `} >Instructor</button>
                                }</td>
                                <td><button onClick={() => handleDelete(user)} className="btn btn-ghost text-red-400"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllUsers;