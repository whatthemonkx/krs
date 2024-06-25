import { useContext } from 'react';
import CartContext from '../context/CartContext';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
