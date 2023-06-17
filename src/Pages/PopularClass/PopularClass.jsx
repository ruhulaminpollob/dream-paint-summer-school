import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";


const PopularClass = () => {
    const [classes, setClasses]=useState([])

    useEffect(()=>{
        fetch('https://dream-paint-server.vercel.app/aprovedclasses')
        .then(res=>res.json())
        .then(data=>setClasses(data))
    },[])
// console.log(classes);
    const sortedData = classes.sort((a, b) => a.availableSeats - b.availableSeats)
    const popular= sortedData.slice(0,6)
console.log(popular)
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Popular Classes</h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                {
                    popular?.map(singleClass=><ClassCard key={singleClass._id} singleClass={singleClass}></ClassCard>)
                }
            </div>
            
        </div>
    );
};

export default PopularClass;