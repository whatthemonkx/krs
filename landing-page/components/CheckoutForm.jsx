import { useContext, useEffect, useState } from 'react';
import { PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailMissing, setEmailMissing] = useState(false);
  const [address, setAddress] = useState({
    name: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    },
    email: ''
  });
  const { cart, removeFromCart, updateCartItem, clearCart } = useContext(CartContext);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!address.email) {
      setEmailMissing(true);
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
      redirect: 'if_required' 
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded!");
      clearCart();
      router.push('/success'); 
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const handleAddressChange = (event) => {
    if (event.complete) {
      setAddress({
        ...address,
        name: event.value.name,
        address: {
          ...event.value.address
        }
      });
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <AddressElement 
        id="address-element" 
        options={{
          mode: 'shipping', 
          defaultValues: {
            name: `${address.name}`, 
            address: address.address,
          },
        }} 
        onChange={handleAddressChange}
      />
      <div className="checkoutFormContainer">
        <label htmlFor="email" className="checkoutFormLabel">Email</label>
        <input type="email" id="email" className={emailMissing ? "checkoutFormInput checkoutFormInputError" : "checkoutFormInput"} placeholder="Email" value={address.email} onChange={(e) => { setAddress({...address, email: e.target.value}); setEmailMissing(false); }} />
        {emailMissing && <p className="errorMessage">Please provide your email.</p>}
      </div>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="checkoutFormButton">
        <span id="button-text">
          {isLoading ? "Loading" : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
