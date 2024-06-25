import React from "react";
import { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [fnameMisiing, setFnameMissing] = useState(false);
  const [lnameMisiing, setLnameMissing] = useState(false);
  const [emailMisiing, setEmailMissing] = useState(false);

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

    if (fname.replace(/\s+/g, '') == "" || lname.replace(/\s+/g, '') == "" || email.replace(/\s+/g, '') == "") {
      if (fname.replace(/\s+/g, '') == "") {
        setFnameMissing(true)
      }
      if (lname.replace(/\s+/g, '') == "") {
        setLnameMissing(true)
      } 
      if (email.replace(/\s+/g, '') == "") {
        setEmailMissing(true)
      }
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="checkoutFormContainer">
        <label htmlFor="" className="checkoutFormLabel">First Name</label>
        <input type="text" className={fnameMisiing ? "checkoutFormInput checkoutFormInputError" : "checkoutFormInput"} placeholder="John" value={fname} onChange={(e) => { setFname(e.target.value); setFnameMissing(false);}}/>
        {fnameMisiing && <p className="errorMessage">Your first name is incomplete.</p>}
      </div>
      <div className="checkoutFormContainer">
        <label htmlFor="" className="checkoutFormLabel">Last Name</label>
        <input type="text" className={lnameMisiing ? "checkoutFormInput checkoutFormInputError" : "checkoutFormInput"} placeholder="Smith" value={lname} onChange={(e) => {setLname(e.target.value); setLnameMissing(false);}}/>
        {lnameMisiing && <p className="errorMessage">Your last name is incomplete.</p>}
      </div>
      <div className="checkoutFormContainer">
        <label htmlFor="" className="checkoutFormLabel">Email</label>
        <input type="email" className={emailMisiing ? "checkoutFormInput checkoutFormInputError" : "checkoutFormInput"} placeholder="Johnsmith@gmail.com" value={email} onChange={(e) => {setEmail(e.target.value); setEmailMissing(false);}}/>
        {emailMisiing && <p className="errorMessage">Your email is incomplete.</p>}
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