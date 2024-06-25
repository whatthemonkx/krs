import '../public/global.css';
import { CartProvider } from '../context/CartContext';
import {NextUIProvider} from '@nextui-org/react'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </NextUIProvider>
  );
}

export default MyApp;
