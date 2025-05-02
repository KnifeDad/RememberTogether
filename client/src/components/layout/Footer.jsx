import React from 'react';
import { Box, Text, Link, Flex } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" py={4} px={8} bg="gray.100">
      <Flex justify="space-between" align="center">
        <Text>&copy; {new Date().getFullYear()} RememberTogether. All rights reserved.</Text>
        <Flex gap={4}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact Us</Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
