import { useContext, useEffect, useState } from 'react';
import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';
import { Flex, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button } from '@chakra-ui/react';

const Cart = ({ isOpen, onClose, btnRef }) => {
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
        return total + item.item_price * item.quantity;
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

  // console.log(cart)

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent bgColor="#333">
        <DrawerCloseButton />
        <DrawerHeader>Shopping Cart</DrawerHeader>
        <DrawerBody>
          <div>
            {cart.filter(item => item.quantity != 0).map((item) => (
              <div key={item.item_id}>
                <h3>{item.item_name}</h3>
                <p>Price: ${item.item_price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.item_id)}>Remove</button>
                <button onClick={() => updateCartItem(item.item_id, item.quantity + 1)}>+</button>
                <button onClick={item.quantity === 1 ? () => removeFromCart(item.item_id) : () => updateCartItem(item.item_id, item.quantity - 1)}>-</button>
              </div>
            ))}
          </div>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </DrawerBody>

        <DrawerFooter>
        <Flex justify="space-between" width="100%">
          <Button variant='outline' onClick={handleCheckout} color="fff">
            Checkout
          </Button>          
          <Button variant='outline' onClick={onClose} color="fff">
            Cancel
          </Button></Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
