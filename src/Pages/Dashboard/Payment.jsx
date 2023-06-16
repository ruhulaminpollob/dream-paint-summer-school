import { Helmet } from "react-helmet-async";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
const Payment = () => {
    const loadedData = useLoaderData()
    console.log(loadedData)
    const [classInfo, setClassInfo] = useState(loadedData)

    
    const price = parseFloat(classInfo.price.toFixed(2))


    return (
        <div>
            <Helmet>
                <title>Dream Paint-Payment</title>
            </Helmet>
            <h1 className="py-10 text-4xl font-bold text-center underline text-cyan-400">Payment</h1>
            <h1 className="text-2xl font-bold text-center">Enroll Cost = ${price}</h1>

            <div>

                <Elements stripe={stripePromise}> <PaymentForm price={price} classInfo={classInfo}></PaymentForm> </Elements>
            </div>
        </div>
    );
};

export default Payment;