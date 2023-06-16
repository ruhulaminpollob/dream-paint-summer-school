import { Helmet } from "react-helmet-async";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import useClasses from "../../Utilities/useClasses";

const stripePromise=loadStripe(import.meta.env.VITE_Payment_PK)
const Payment = () => {
    const [data]=useClasses()
    const totalPrice = data.reduce((sum, singleData) => singleData.price + sum, 0)

    const total=parseFloat(totalPrice.toFixed(2))

    console.log(totalPrice)
    return (
        <div>
            <Helmet>
                <title>Dream Paint-Payment</title>
            </Helmet>
            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Payment</h1>
            <h1 className="text-2xl font-bold">Total Price = ${totalPrice}</h1>

            <div>

            <Elements stripe={stripePromise}> <PaymentForm price={total} data={data}></PaymentForm> </Elements>
            </div>
        </div>
    );
};

export default Payment;