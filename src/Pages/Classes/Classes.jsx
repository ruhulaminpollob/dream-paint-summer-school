import { useEffect, useState } from "react";
import ClassCard from "../PopularClass/ClassCard";


const Classes = () => {

    const [classes, setClasses]=useState([])

    useEffect(()=>{
        fetch('https://dream-paint-server.vercel.app/aprovedclasses')
        .then(res=>res.json())
        .then(data=>setClasses(data))
    },[])


    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">All Classes</h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                {
                    classes.map(singleClass=><ClassCard key={singleClass.name} singleClass={singleClass}></ClassCard>)
                }
            </div>
            
        </div>
    );
};

export default Classes;