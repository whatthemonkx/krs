import '../public/global.css';
import { CartProvider } from '../context/CartContext';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  );
}

export default MyApp;
