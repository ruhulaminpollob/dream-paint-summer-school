import axios from "axios";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Utilities/useAxiosSecure";


const imageHosting = import.meta.env.VITE_Image_Hosting_token
const AddClasses = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();


    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHosting}`

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target;


        const name = form.name.value
        const availableSeats = parseFloat(form.availableSeat.value);
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const price = parseFloat(form.price.value);
        const image = form.image.files[0];
        const state = 'pending'
        const newClass = { name, availableSeats, price, instructorName, instructorEmail, state }


        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post(imageHostingURL, formData);

            if (response.data.success) {
                const imgURL = response.data.data.display_url;
                const classData = newClass;
                classData.image = imgURL;

                axiosSecure.post('/classes', classData)
                    .then(data => {
                        if (data.data.insertedId) {
                            Swal.fire(
                                'Success',
                                'New Class Added',
                                'success'
                            )
                                form.reset()
                        }
                    })
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="p-5">
            <Helmet>
                <title>Dream Paint - Add Class</title>
            </Helmet>

            <h1 className="text-cyan-400 text-2xl md:text-4xl font-bold underline text-center py-10">Add A Class</h1>
            <form onSubmit={handleSubmit} >
                {/* form row  */}
                <div className='md:flex'>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <label className="input-group">

                            <input type="text" name='name' required placeholder='Class Name' className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control  md:w-1/2">
                        <label className="label">
                            <span className="label-text">Seat</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='availableSeat' required placeholder="Seat" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                {/* form row  */}
                <div className='md:flex'>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Instructor</span>
                        </label>
                        <label className="input-group">

                            <input type="text" name="instructorName" required placeholder="Instructor" disabled defaultValue={user.displayName} className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <label className="input-group">

                            <input type="text" name="instructorEmail" required disabled defaultValue={user.email} placeholder="Email" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                <div className="md:flex">

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <label className="input-group">
                            <input type="file" name='image' required className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='price' placeholder="Price" required className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                <input type="submit" className='btn bg-cyan-400 text-white font-bold hover:bg-cyan-300 w-full  my-4' value="Add Class" />
            </form>
        </div>
    );
};

export default AddClasses;