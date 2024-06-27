import Product from './Product';
import products from '../data/products';
import React, { useEffect, useState, useRef } from 'react';
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

  // console.log(items)

  return (
    <div className='itemsSection'>
      <div className='itemsContainer'>
        {items.map((item) => (
          <div key={item.item_id}>
            <Product item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
