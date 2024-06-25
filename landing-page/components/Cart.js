import { useContext, useEffect, useState } from 'react';
import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';

const Cart = () => {
  const { cart, removeFromCart, updateCartItem } = useContext(CartContext);
  const [hydrated, setHydrated] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  if (!hydrated) {
    return null; 
  }

  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalPrice * 100 }), // Convert dollars to cents
    });

    const { sessionId } = await response.json();
    router.push(`/payment?sessionId=${sessionId}`);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.filter(item => item.quantity != 0).map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
            <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
            <button onClick={item.quantity === 1 ? () => removeFromCart(item.id) : () => updateCartItem(item.id, item.quantity - 1)}>-</button>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button onClick={handleCheckout}>
        Pay with Stripe
      </button>
      <a href="/"><button>go back home</button></a>
    </div>
  );
};

export default Cart;
