import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header /> {/* Header at the top */}
      <Container maxW="container.xl" flex="1" py={8}>
        {children} {/* Render the main content */}
      </Container>
      <Footer /> {/* Footer at the bottom */}
    </Box>
  );
}

export default Layout;
