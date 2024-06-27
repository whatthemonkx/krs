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

  return (
    <>
      <Navbar />
      <div>
        <div>
          <ProductsList />
        </div>
      </div>
    </>
  );
}
