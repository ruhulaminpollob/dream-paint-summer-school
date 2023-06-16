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

    const formattedPaymentData = history
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by descending date
        .map((payment) => ({
            paidClassesName:payment.paidClassesName,
            price: payment.price,
            transactionId:payment.transactionId,
            date: new Date(payment.date).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }),
        }));


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
                        <th>Class Name</th>
                        <th>Transaction Id</th>
                        <th>Date & time</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        formattedPaymentData.map((singleHistory, index) => <tr key={singleHistory._id}>
                            <th>{index + 1}</th>
                            <td>{singleHistory.paidClassesName}</td>
                            <td>{singleHistory.transactionId}</td>
                            <td>{singleHistory.date}</td>
                        </tr>)
                    }




                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;