import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from "react";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (sessionId) {
      const fetchPaymentIntent = async () => {
        const response = await fetch(`/api/fetch-payment-intent?sessionId=${sessionId}`);
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      };

      fetchPaymentIntent();
    }
  }, [sessionId]);

  const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: 'Courier New, Courier, monospace',
      // fontWeightNormal: '500',
      // borderRadius: '8px',
      // colorBackground: '#0A2540',
      colorPrimary: '#A31621',
      // accessibleColorOnColorPrimary: '#1A1B25',
      // colorText: 'white',
      // colorTextSecondary: 'white',
      // colorTextPlaceholder: '#ABB2BF',
      // tabIconColor: 'white',
      // logoColor: 'dark'
    },
    rules: {
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#A31621',
      },
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;