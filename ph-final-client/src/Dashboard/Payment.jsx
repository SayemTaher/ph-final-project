import React from 'react';
import SectionTitle from '../Components/SectionTitle';
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    
   
    return (
      <div>
        <SectionTitle
          heading="Add payment details"
          subHeading="Manage your payment"
        ></SectionTitle>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    );
};

export default Payment;