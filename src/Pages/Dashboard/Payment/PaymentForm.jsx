import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState();

    const { isPending, data: parcelInfo = [] } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isPending) {
        return <progress className="progress w-56"></progress>
    }

    console.log(parcelInfo);
    const amount = parcelInfo.cost;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message)
        }
        else {
            setError('');
            console.log('payment Method', paymentMethod)
        }

        const amountIncents = amount * 100; // converting dollars to cents

        // Create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountIncents,
            parcelId
        });
        console.log('res come from intent', res);

        const clientSecret = res.data.clientSecret
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'no-email@zapshift.com'
                }
            }
        })
        if (result.error) {
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                text: "Oops...Your Payment Method is Failed!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });

            console.log("Payment error:", result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
            console.log("Payment successful!", result.paymentIntent);

            // mark parcel paid & create payment history
            const paymentData = {
                parcelId,
                email: user.email,
                amount,
                transactionId: result.paymentIntent.id,
                paymentMethod: result.paymentIntent.payment_method_types
            }

            const paymentRef = await axiosSecure.post('/payment', paymentData)
            if (paymentRef.data.insertedId) {
                console.log('Payment Successfully');
                Swal.fire({
                    title: "Payment Successful!",
                    html: `
            <p>Your payment has been completed successfully.</p>
            <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
        `,
                    icon: "success",
                    confirmButtonText: "Go to My Parcels",
                    showCloseButton: true,
                    timer: 5000, // auto close after 5 seconds
                    timerProgressBar: true,
                    didClose: () => {
                        navigate('/dashboard/myParcels');
                    }
                });
                navigate('/dashboard/myParcels')
            }
        }
    }
    return (
        <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Secure Payment
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-3 border rounded-lg shadow-sm bg-gray-50">
                        <CardElement>

                        </CardElement>
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe}
                        className="w-full btn btn-primary "
                    >
                        Pay <span className="font-bold text-[18px]">${amount}</span>
                    </button>
                    <p>
                        {
                            error && <p className="text-red-700"> {error}</p>
                        }
                    </p>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;