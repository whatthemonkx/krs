import React, { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import Cart from './Cart';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../context/CartContext';


const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const { cart } = useContext(CartContext);
    const [cartQuantity, setCartQuantity] = useState(0);

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