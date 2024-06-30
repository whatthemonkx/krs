import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useContext, useEffect, useState } from 'react';
import CartContext from '../context/CartContext';
import Loading from '../components/Loading';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [clientSecret, setClientSecret] = useState(null);
  const { cart } = useContext(CartContext);
  const [hydrated, setHydrated] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      const fetchPaymentIntent = async () => {
        const response = await fetch(`/api/fetch-payment-intent?sessionId=${sessionId}`);
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      };

      fetchPaymentIntent().finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
    }

    setHydrated(true);
  }, [sessionId]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => {
        return total + item.item_price * item.quantity;
      }, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  if (!hydrated) {
    return null; 
  }  

  const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: 'Courier New, Courier, monospace',
      fontWeightNormal: '500',
      colorBackground: '#000',
      colorPrimary: '#A31621',
      colorText: 'white',
      colorTextSecondary: 'white',
      colorTextPlaceholder: '#818181',
    },
    rules: {
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#A31621',
      },
      '.Input': {
        backgroundColor: '#000',
        border: '1px solid #fff'
      }
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {loading && <Loading />}
      <div className='checkoutNavbar'>
        <a href='/'><div className='title'>KoNGA-71</div></a>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>  
      </div>
      <div className='checkoutContainer'>
        <div className='checkoutCart'>
          <div>
            {cart.filter(item => item.quantity != 0).map((item) => (
              <div key={item.sizeId} className='cartItem'>
                <img
                  className='mainpageItemImage'
                  src={`${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.variations.filter(variants => variants.id === parseInt(item.variant))[0].images[0].name}`}
                  alt=""
                  width={100}
                />
                <div>
                  <div>{item.item_name} </div>
                  <div>{item.variations.filter(variants => variants.id === parseInt(item.variant))[0].name} / {item.variations.filter(variants => variants.id === parseInt(item.variant))[0].sizes.filter(size => size.id === parseInt(item.sizeId))[0].name}</div>
                </div>
                <div>
                  <div>${item.item_price * item.quantity}</div>
                  <div className='cartQuantityChanger'>
                    <div className='checkoutQuantity'>{item.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='checkoutForm'>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;