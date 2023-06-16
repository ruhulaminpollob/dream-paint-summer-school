import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useClasses from "../../Utilities/useClasses";


const MySelectedClasses = () => {
    const [data, isLoading, refetch] = useClasses()
    const [selected, setSelected]=useState([])
    useEffect(() => {
        if (data) {
          const isSelected = data.filter(item => item.state === 'selected')
          setSelected(isSelected)
          console.log(selected)
        }
      }, [data])


    
    // console.log(data);
    if (isLoading) {
        return
    }

    

    const totalPrice = selected.reduce((sum, singleData) => singleData.price + sum, 0)
    // console.log(totalPrice);

    const handleDelete=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selected/${id}`,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(datas=>{
                    if (datas.deletedCount > 0) {
                        refetch()

                        Swal.fire(
                          'Deleted!',
                          'Your class has been deleted.',
                          'success'
                        )
                    }
                })
                    

            }
          })
    }

    // const navigate=useNavigate()
    // // handle payment all together ----------
    // const paymentAll=()=>{
    //    navigate('/')
    //     //
    //     console.log('pay all clicked');
    // }

    // // handle single payment --------------
    // const handlePayment=()=>{
    //     console.log('single payment clicked')
    // }
    return (
        <div>
            <Helmet>
                <title>Dream Paint-My Selected Class</title>
            </Helmet>

            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Selected Classes</h1>
            <div className="flex items-center bg-gray-50 p-5 justify-around">
                <h1 className="text-2xl font-bold">Total Price = ${totalPrice}</h1>
                {/* <button onClick={()=>paymentAll()} className="btn btn-info text-white">Pay All Together</button> */}
                
                {
                    totalPrice <= 0 ? <button disabled className="btn btn-info text-white">Pay All Together</button> : <Link to='/dashboard/payment'  className="btn btn-info text-white">Pay All Together</Link>

                } 
                

            </div>

            <div className="overflow-x-auto px-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Delete Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            selected.map((singleData, index) => <tr key={singleData._id}>
                                    
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
                                       {singleData.instructorName}
                                    </td>
                                    <td>
                                        ${singleData.price}
                                    </td>
                                    <td>
                                        <button onClick={()=>handleDelete(singleData._id)} className="btn btn-error text-white">Delete</button>
                                    </td>
                                    
                                </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;