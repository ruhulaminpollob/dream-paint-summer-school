import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useClasses from "../../Utilities/useClasses";


const MyEnrolledClasses = () => {
    const [data, isLoading] = useClasses()
    const [enrolled, setEnrolled]=useState([])
    useEffect(() => {
        if (data) {
          const isEnrolled = data.filter(item => item.state === 'enrolled')
          setEnrolled(isEnrolled)
        }
      }, [data])

    if (isLoading) {
        return
    }

    
    return (
        <div>
            <Helmet>
                <title>Dream Paint-My enrolled Class</title>
            </Helmet>

            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">enrolled Classes</h1>
            

            <div className="overflow-x-auto px-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Instructor</th>
                            <th>Status</th>
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            enrolled.map((singleData, index) => <tr key={singleData._id}>
                                    
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
                                       {singleData?.instructorName}
                                    </td>
                                    <td>
                                        {singleData.state}
                                    </td>
                                    
                                    
                                </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyEnrolledClasses;