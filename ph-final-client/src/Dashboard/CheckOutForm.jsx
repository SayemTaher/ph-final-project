// Client Side
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCart from "../Custom/useCart/useCart";
import useAxios from "../Custom/CustomAxios/useAxios";
import UseAuth from "../Custom/cutomAuth/UseAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const [message, setMessage] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const {user} = UseAuth()
  const stripe = useStripe();
    const elements = useElements();
    const [transactionId, setTransactionid] = useState('')
  const [cart,refetch] = useCart();
  const amount = cart.reduce((sum, item) => sum + item.price, 0);
    const axiosSecure = useAxios();
    const navigate = useNavigate()
    
  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => {
          setClientSecret(res.data.client_secret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
          setMessage("Failed to fetch client secret. Please try again.");
        });
    }
  }, [axiosSecure, amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      if (!clientSecret) {
        setMessage("Failed to get client secret from backend");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                  email: user?.email || 'Anonymous',
                  name: user?.displayName || 'Not available'
            }
          },
          
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
            setMessage("Payment succeeded!");
            setTransactionid(result.paymentIntent.id)
            console.log("Payment details:", result.paymentIntent);
            
            // save the payment in
            const paymentHistory = {
              name: user.displayName,
                email: user.email,
                price: amount,
                date: new Date(),
                cartId: cart.map(item => item._id),
                menuItemId: cart.map(item => item.MenuId),
                status: 'Pending',
                transactionId: result.paymentIntent.id
              
            };
            const res = await axiosSecure.post('/payments', paymentHistory)
            console.log(res.data)
            refetch()
            toast.success('Payment was successfull')
            navigate('/dashboard/paymentHistory')

        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
      <div className="bg-white p-10 rounded-md shadow-md">
          <h1 className="mb-5 font-bold">Due price : <span className="bg-green-100 p-2 text-lg font-bold text-blue-600 shadow-sm rounded-xl">$ {amount}</span></h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <CardElement />
        <button
          type="submit"
          className="btn btn-primary text-white"
          disabled={!stripe || !clientSecret}
        >
          Complete Payment
        </button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
