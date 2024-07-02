import { useContext, useEffect, useState } from 'react';
import { PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';
import { processSale } from '../pages/api/sales';
import { getSizes } from '../pages/api/items';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [emailMissing, setEmailMissing] = useState(false);
  const [error, setError] = useState('');
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
  const { cart, clearCart } = useContext(CartContext);

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => {
        return total + item.item_price * item.quantity;
      }, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, [cart]);

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
    setError('');

    const ids = [];

    for (let i = 0; i < cart.length; i++) {
      ids.push(cart[i].sizeId);
    }

    const items = await getSizes(ids);
    const itemsReversed = items.reverse();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].quantity > itemsReversed[i].quantity) {
        setError(`Only ${itemsReversed[i].quantity} ${cart[i].item_name}: ${cart[i].variations.find(variant => variant.id === parseInt(cart[i].variant)).name} / ${itemsReversed[i].name} availble!`)
        return
      }
    }
    
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
      processSale(
        address.name,
        address.address.line1,
        address.address.line2,
        address.address.city,
        address.address.postal_code,
        address.address.state,
        address.email,
        cart,
        totalPrice,
      )
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
      {error !== '' && <div id="payment-message" style={{width: "290px"}}>{error}</div>}
    </form>
  );
}
