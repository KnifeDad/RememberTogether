// filepath: c:\Users\sagos\OneDrive\Desktop\Remember Together\RememberTogether\client\src\theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      red: '#FF1053',
      purple: '#6C6EA0',
      blue: '#66C7F4',
      gray: '#C1CAD6',
      white: '#FFFFFF',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.gray', // Set the background color
        color: 'brand.purple', // Set the default text color
      },
      a: {
        color: 'brand.blue',
        _hover: {
          color: 'brand.red',
        },
      },
    },
  },
});

export default theme;
