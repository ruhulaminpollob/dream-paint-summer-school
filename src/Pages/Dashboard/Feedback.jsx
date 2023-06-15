import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Feedback = () => {

    const loadedInfo = useLoaderData()
    const [instructorInfo, setInstructorInfo] = useState(loadedInfo)

    const { instructorName, name, state } = instructorInfo
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        Swal.fire(
            'Success',
            `Feedback sent to ${instructorName}`,
            'success'
          )
        navigate('/dashboard/manageclasses')
    }
    return (
        <div className="md:px-10">
            <Helmet>
                <title>Dream Paint-Feedback</title>
            </Helmet>
            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Feedback</h1>
            <div className=" text-lg font-bold">
                <h2>To : {instructorName}</h2>
                <p>The reason Why your  {name} Class {state}</p>
            </div>
            <form onSubmit={handleSubmit}>

                <textarea className="textarea textarea-info w-full" placeholder="Feedback"></textarea>
                <input type="submit" className=" btn btn-info text-white " value={`Send To ${instructorName ? instructorName : 'Instructor'}`} />

            </form>
        </div>
    );
};

export default Feedback;