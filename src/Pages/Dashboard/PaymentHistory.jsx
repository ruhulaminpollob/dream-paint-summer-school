import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Utilities/useAxiosSecure";


const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const [history, setHistory] = useState([])


    useEffect(() => {

        axiosSecure.get(`/payments?email=${user.email}`)
            .then(res => {
                setHistory(res.data);
            })
    }, [user, axiosSecure])


    return (
        <div>
            <Helmet>
                <title>Dream Paint-History</title>
            </Helmet>
            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Payment History</h1>

            <table className="table table-zebra">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        history.map((singleHistory, index) => <tr key={singleHistory._id}>
                            <th>{index}</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>)
                    }




                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;