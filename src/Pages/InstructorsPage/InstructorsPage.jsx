import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";



const InstructorsPage = () => {
    const loadInstructor = useLoaderData()
    const [instructor, setInstructor] = useState(loadInstructor)



    return (
        <div>
            <Helmet>
                <title>Dream Paint - Instructors</title>
            </Helmet>
            <h1 className="text-cyan-400 text-2xl md:text-4xl font-bold underline text-center py-10">Instructors</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center">


                {
                    instructor.map(info => <div key={info._id} className="card w-72 bg-base-100 shadow-xl">
                        <figure><img src={info.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{info.name}</h2>
                            <p>Contact Me : {info.email}</p>
                            {/* <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div> */}
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default InstructorsPage;