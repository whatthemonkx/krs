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
      body: JSON.stringify({ amount: totalPrice * 100 }),
    });

    const { sessionId } = await response.json();
    router.push(`/payment?sessionId=${sessionId}`);
  };

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size="sm">
      <DrawerOverlay/>
      <DrawerContent bgColor="#333">
        <DrawerCloseButton />
        <DrawerHeader>Shopping Cart</DrawerHeader>
        <DrawerBody>
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
                    <button disabled={item.variations.find(variant => variant.id === parseInt(item.variant)).sizes.find(size => size.id === parseInt(item.sizeId)).quantity === item.quantity} onClick={() => updateCartItem(item.sizeId, item.quantity + 1)}>+</button>
                    <div>{item.quantity}</div>
                    <button onClick={item.quantity === 1 ? () => removeFromCart(item.sizeId) : () => updateCartItem(item.sizeId, item.quantity - 1)}>-</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </DrawerBody>

        <DrawerFooter>
          <Flex width="100%" flexDirection={'column'} gap={3}>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>         
            <Button 
              variant='outline' 
              onClick={handleCheckout} 
              color="fff" 
              width="100%"
              _hover={{ bg: 'transparent', borderColor: 'currentColor' }}
              _active={{ bg: 'transparent', borderColor: 'currentColor' }} 
              _focus={{ boxShadow: 'none' }}
            >
              Proceed to checkout
            </Button>          
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
