
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Utilities/useAxiosSecure";


const ManageClasses = () => {

    const [axiosSecure] = useAxiosSecure()


    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        return res.data
    })
    


    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this class",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    const handleApprove = id => {
        console.log(id)
    }

    return (
        <div>
            <Helmet>
                <title>Dream Paint-Manage Class</title>
            </Helmet>

            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Manage Classes</h1>


            <div className="overflow-x-auto px-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Delete Class</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            classes.map((singleData, index) => <tr key={singleData._id}>

                                {index + 1}
                                <td>
                                    <div className="flex items-center space-x-3">

                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={singleData.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{singleData.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {singleData.instructorName}
                                </td>
                                <td>
                                    ${singleData.price}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(singleData._id)} className="btn btn-error">Delete</button>
                                </td>
                                <td>
                                    {
                                        singleData.state === 'approved' ? 'Approved' :
                                            <button onClick={() => handleApprove(singleData._id)} className="btn btn-info text-white">Approve</button>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageClasses;