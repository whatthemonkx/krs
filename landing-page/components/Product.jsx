// import { useContext } from 'react';
// import CartContext from '../context/CartContext';

// const Product = ({ item }) => {
//   const { addToCart } = useContext(CartContext);

//   const handleAddToCart = () => {
//     addToCart({ ...item, quantity: 1 });
//   };

//   return (
//     <div>
//       <h3>{item.name}</h3>
//       <p>Price: ${item.price}</p>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default Product;

import { useContext } from 'react';
import CartContext from '../context/CartContext';

const Product = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div>
      <img src={`${process.env.NEXT_PUBLIC_SERVER_LINK}/itemImages/${item.variations[0].images[0].name}`} alt="" />
      <h3>{item.item_name}</h3>
      <p>Price: ${item.item_price}</p>
    </div>
  );
};

export default Product;

