
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Utilities/useAxiosSecure";


const ManageClasses = () => {

    const [axiosSecure] = useAxiosSecure()

    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        return res.data
    })
    const navigate=useNavigate()


    const handleApprove = id => {
        console.log(id);
        axiosSecure.patch(`/classes/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire(
                        'Approved',
                        'Class is Approved',
                        'success'
                    )
                }
            })
    }
    const handleDeny = id => {
        console.log(id);
        axiosSecure.patch(`/classesdeny/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire(
                        'Deny',
                        'Class is Denied',
                        'error'
                    )
                }
            })
    }

    const handleFeedback = classInfo => {
       navigate(`/dashboard/feedback/${classInfo._id}`)
    }

    return (
        <div>
            <Helmet>
                <title>Dream Paint-Manage Class</title>
            </Helmet>

            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Manage Classes</h1>


            <div className="overflow-x-auto px-10">


                {
                    classes.map((singleData, index) => <div key={singleData._id} className="card mb-10 lg:card-side bg-base-100 shadow-xl">
                        <figure><img className="w-40 rounded" src={singleData.image} alt="Album" /></figure>
                        <div className="card-body">
                            <h1 className="text-4xl font-bold"># {index + 1}</h1>
                            <h2 className="card-title">{singleData.name}</h2>
                            <div className="grid grid-cols-2">
                                <div>
                                    <h1>Instructor: {singleData.instructorName}</h1>
                                    <h1>Instructor Email: {singleData.instructorEmail}</h1>

                                </div>
                                <div>
                                    <h5>Available Seats: {singleData.availableSeats}</h5>
                                    <h5> Price: {singleData.price}</h5>
                                </div>

                            </div>

                            <h4>State: <span className={`text-lg font-bold uppercase ${singleData.state === 'approved' ? 'text-green-400' : ''} `}> {singleData.state}</span></h4>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleApprove(singleData._id)} className={`btn btn-info text-white ${singleData.state !== 'pending' ? 'btn-disabled' : ''}`}>Approve</button>
                                <button onClick={() => handleDeny(singleData._id)} className={`btn btn-error text-white  ${singleData.state !== 'pending' ? 'btn-disabled' : ''}`}>Deny</button>
                                <button onClick={()=>handleFeedback(singleData)}  className={`btn btn-success text-white `}>Feedback</button>
                            </div>
                        </div>
                    </div>
                    )}



            </div>
        </div>
    );
};

export default ManageClasses;