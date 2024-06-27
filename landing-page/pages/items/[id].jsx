import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import { getSingleItems } from '../api/items';
import CartContext from '../../context/CartContext';

const AccountPage = () => {
  const [item, setItem] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    sizes: [],
    images: [{ name: '' }], // Adjust with appropriate default structure
  });
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchItems = async () => {
      if (id) {
        const items = await getSingleItems(id);
        const firstItem = items[0];
        setItem(firstItem);
        setCurrentItem(firstItem.variations[0]);
      }
    };

    fetchItems();
  }, [id]);

  const handleAddToCart = () => {
    if (size !== null && quantity !== null && quantity !== 'null' ) {
      addToCart({ ...item, quantity: parseInt(quantity), sizeId: parseInt(size), variant: currentItem.id});
    }
  };

  const handleVariantClick = (variant) => {
    setCurrentItem(variant);
    setSize(null);
    setQuantity(null);
    setMaxQuantity(null);
  };

  return (
    <div className='pageContainer'>
      <Navbar />
      <div className='itemsSection'>
        {item && (
          <div className='singleItemContainer'>
            {currentItem && (
              <div className='singleItemImage'>
                <img
                  className='mainpageItemImage'
                  src={`${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${currentItem.images[0].name}`}
                  alt=""
                />
              </div>
            )}
            <div>
              <div>{item.item_name}</div>
              <div>{currentItem?.name}</div>
              <div>{item.item_description}</div>
              <div className='varientSelection'>
                {item.variations.map((variant) => (
                  <div key={variant.id} className='singleVarientSelection' onClick={() => { variant.id !== currentItem.id && handleVariantClick(variant) }}>
                    <img
                      className='mainpageItemImage'
                      src={`${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${variant.images[0].name}`}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </div>
                ))}
              </div>
              <div>${item.item_price}</div>



                <label htmlFor="size">Select size: </label>
              <select name="size" id="size" onChange={(e) => { setSize(e.target.value); setMaxQuantity(currentItem.sizes.filter(sizes => sizes.id === parseInt(e.target.value))[0].quantity) }}>
                {currentItem.sizes.map((size) => (
                  <option key={size.id} value={size.id} style={{ color: "black" }}>{size.name}</option>
                ))}
              </select><br />





              {maxQuantity !== null && 
              <>
              <label htmlFor="quantity">Select quantity: </label>
              <select name="quantity" id="quantity" onChange={(e) => setQuantity(e.target.value)}>
                {[...Array(maxQuantity)].map((_, index) => (
                  <option key={index + 1} value={index + 1} style={{ color: "black" }}>{index + 1}</option>
                ))}
              </select></>}
              <div><button onClick={handleAddToCart}>Add to Cart</button></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
