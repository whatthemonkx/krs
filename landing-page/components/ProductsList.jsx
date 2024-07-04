import Product from './Product';
import React, { useEffect, useState } from 'react';
import { getItems } from '../pages/api/items';

const ProductsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);

  return (
    <div className='itemsSection'>
      <div className='itemsContainer'>
        {items.filter(item => item.item_status === "Active").map((item) => (
          <div key={item.item_id}>
            <Product item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
