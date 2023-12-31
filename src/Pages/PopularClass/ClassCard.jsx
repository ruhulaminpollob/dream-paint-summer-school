import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import useAdmin from "../../Utilities/useAdmin";
import useInstructor from "../../Utilities/useInstructor";


const ClassCard = ({ singleClass }) => {
    const { user } = useContext(AuthContext)
    const { name, image, instructorName, availableSeats, price } = singleClass || {}


    const navigate = useNavigate()

    //todo: some work to do
    const [isAdmin]=useAdmin()
    const [isInstructor]=useInstructor()

    const handleSelectClass = () => {
        if (!user) {
            Swal.fire({
                title: 'Opps!',
                text: "Please login first",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })
        }

        const myClassData = { name, image, price, state: 'selected', instructorName, email: user.email }


        fetch("https://dream-paint-server.vercel.app/myclasses", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myClassData)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.insertedId) {
                    Swal.fire(
                        'Good job!',
                        ` Class added to your wish list`,
                        'success'
                    )
                }
                else {
                    Swal.fire(
                        'Ops!',
                        `${data?.message}`,
                        'error'
                    )
                }


            })


    }
    return (
        <div className={`card card-compact w-72 mx-auto md:w-96 bg-base-100 shadow-xl ${availableSeats === 0 && "bg-red-400"}`}>
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Instructor: {instructorName}</p>
                <p>Price:$ {price}</p>
                <div className="flex">

                    <p>Available Seat: {availableSeats}</p>
                    <p>Total Seats: 20</p>
                </div>
                <div className="card-actions justify-end ">
                    <button onClick={handleSelectClass} disabled={isAdmin || isInstructor || availableSeats <= 0 } className={`btn btn-info text-white `}  >Select Class</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;