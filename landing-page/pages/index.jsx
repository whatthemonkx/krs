import React, { useEffect, useState, useRef } from 'react';
import { getItems } from './api/items';
import ProductsList from '../components/ProductsList';
import { Link, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure } from '@chakra-ui/react';
import Cart from '../components/Cart';
import Navbar from '../components/Navbar';

export default function Home() {
  const [items, setItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);

  console.log(items);

  return (
    <>
      <Navbar />
      <div>
        <div>
          <h1>Welcome to Our Store</h1>
          <ProductsList />
          <a href="/cart"><button>go to cart</button></a>
        </div>
        <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
          About
        </Link>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
        </Button>
        <Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </div>
    </>
  );
}
