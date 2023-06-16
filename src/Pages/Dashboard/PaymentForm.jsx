import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Utilities/useAxiosSecure";

const PaymentForm = ({ price, classInfo }) => {
    const stripe = useStripe()
    const element = useElements()
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useContext(AuthContext)
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [price, axiosSecure])

    // handle payment submit 
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !element) {
            return
        }

        const card = element.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card

        })
        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.name || 'Unknown',
                    email: user?.email || 'unavailable'
                },
            },
        })
        if (confirmError) {
            console.log(confirmError)
        }
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {

            

            const payment = {
                userName: user?.displayName,
                userEmail: user?.email,
                transactionId,
                price,
                date: new Date(),
                paidClassesId: classInfo._id,
                paidClassesName: classInfo.name
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.insertedId) {
                        // axiosSecure.patch('/payments', payment)
                        setTransactionId(paymentIntent.id)
                        Swal.fire(
                            'Success',
                            'Enrolled successfully',
                            'success'
                        )
                        navigate('/dashboard/myselected')
                    }
                })
        }
    }
    return (
        <div className="p-3 md:max-w-3xl mx-auto md:p-10">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className="btn btn-info  my-5 text-white" disabled={!stripe || !clientSecret || processing}>
                    Confirm
                </button>
            </form>
            {
                cardError && <p className="text-red-400 text-center">{cardError}</p>


            }
            {
                transactionId && <p className="text-green-400 text-lg font-bold">Payment Complete Transaction Id: {transactionId}</p>
            }
        </div>
    );
};

export default PaymentForm;