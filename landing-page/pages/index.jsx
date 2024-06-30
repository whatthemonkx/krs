import React, { useEffect, useState } from 'react';
import { getItems } from './api/items';
import ProductsList from '../components/ProductsList';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };

    fetchItems().finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });
  }, []);

  return (
    <div className='pageContainer'>
      {loading && <Loading />}
      <Navbar />
      <div>
        <div>
          <ProductsList items={items} /> 
        </div>
      </div>
    </div>
  );
}
