import React, { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import Cart from './Cart';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button } from '@chakra-ui/react';


const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const { cart, removeFromCart, updateCartItem } = useContext(CartContext);
    const [hydrated, setHydrated] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const calculateCartQuantity = () => {
          return cart.reduce((total, item) => {
            return total + item.quantity;
          }, 0);
        };
    
        setCartQuantity(calculateCartQuantity());
    }, [cart]);

    return (
        <div className='navbar'>
            <a href='/'><div className='title'>KoNGA-71</div></a>
            <div>
                <button onClick={onOpen}>Cart ({cartQuantity} Items)</button>
                <Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
            </div>
        </div>
    )
}

export default Navbar