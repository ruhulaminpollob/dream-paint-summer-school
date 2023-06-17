import { useEffect, useState } from "react";


const PopularInstructors = () => {
    const [instructor, setInstructor] = useState([])

    useEffect(()=>{
        fetch('https://dream-paint-server.vercel.app/instructor')
        .then(res=>res.json())
        .then(data=>setInstructor(data))
    },[])

    const popular=instructor.slice(0,6)

    return (
        <div className="my-10 md:mx-10">
            
            <h1 className="text-cyan-400 text-2xl md:text-4xl font-bold underline text-center py-10">Popular Instructors</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center">


                {
                    popular.map(info => <div key={info._id} className="card w-72 bg-base-100 shadow-xl">
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


export default PopularInstructors;