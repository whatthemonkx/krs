import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import { getSingleItems } from '../api/items';
import CartContext from '../../context/CartContext';
import Loading from '../../components/Loading';

const AccountPage = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    sizes: [],
    images: [{ name: '' }],
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
        setCurrentItem(firstItem.variations.filter(item => item.status === "Active")[0]);
      }
    };

    fetchItems().finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });
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

  const handleSizeChange = (value) => {
    const selectedSizeId = parseInt(value);
    if (selectedSizeId !== 0) { 
      setSize(selectedSizeId);
      const selectedSize = currentItem.sizes.find(size => size.id === selectedSizeId);
      if (selectedSize) {
        setMaxQuantity(selectedSize.quantity);
        setQuantity(1);
      }
    } else {
      setSize(''); 
      setMaxQuantity(null); 
      setQuantity(null);
    }
  };

  console.log(item)

  return (
    <div className='pageContainer'>
      {loading && <Loading />}
      <Navbar />
      <div className='itemsSection'>
        {item && (
          <div className='singleItemContainer'>
            {currentItem && (
              <div className='singleItemImage'>
                <img
                  className='mainpageItemImage'
                  src={currentItem.images[0].url}
                  alt=""
                />
              </div>
            )}
            <div>
              <div>{item.item_name}</div>
              <div>{currentItem?.name}</div>
              <div>{item.item_description}</div>
              <div className='varientSelection'>
                {item.variations.filter(item => item.status === "Active").map((variant) => (
                  variant.sizes?.[0]?.name && variant.images?.[0].name && <div key={variant.id} className='singleVarientSelection' onClick={() => { variant.id !== currentItem.id && handleVariantClick(variant) }}>
                    <img
                      className='mainpageItemImage'
                      src={variant.images?.[0].url}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </div>
                ))}
              </div>
              <div>${item.item_price}</div>
              <label htmlFor="size">Select size: </label>
              <select name="size" id="size" onChange={(e) => handleSizeChange(e.target.value)}>
                <option value="0" className="selection">Size</option>
                {currentItem.sizes.filter(size => size.quantity > 0).map((size) => (
                  <option key={size.id} value={size.id} className="selection">{size.name}</option>
                ))}
              </select>
              <br />
              {maxQuantity !== null && 
                <>
                  <label htmlFor="quantity">Select quantity: </label>
                  <select name="quantity" id="quantity" onChange={(e) => setQuantity(e.target.value)}>
                    {[...Array(maxQuantity > 10 ? 10 : maxQuantity)].map((_, index) => (
                      <option key={index + 1} value={index + 1} className="selection">{index + 1}</option>
                    ))}
                  </select>
                </>
              }
              <div><button onClick={handleAddToCart}>Add to Cart</button></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
