import axios from "axios";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";


const imageHosting = import.meta.env.VITE_Image_Hosting_token
const AddClasses = () => {
    const { user } = useContext(AuthContext)


    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHosting}`

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target;
        // console.log(event);


        const name = form.name.value
        const availableSeat = form.availableSeat.value;
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const image = form.image.files[0];
        const state='pending'
        const newClass= {name, availableSeat, instructorName, instructorEmail, state}


        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post(imageHostingURL, formData);

            if (response.data.success) {
                const imgURL=response.data.data.display_url;
                const classData=newClass;
                classData.image=imgURL;
                console.log(classData)
            }
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    // console.log(user);
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

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <label className="input-group">
                        <input type="file" name='image' required className="input input-bordered w-full" />
                    </label>
                </div>

                <input type="submit" className='btn bg-cyan-400 text-white font-bold hover:bg-cyan-300 w-full  my-4' value="Add Class" />
            </form>
        </div>
    );
};

export default AddClasses;