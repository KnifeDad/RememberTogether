import React from 'react';
import { Box, Text, Link, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.50, pink.50)',
    'linear(to-r, purple.900, pink.900)'
  );

  return (
    <Box
      as="footer"
      py={4}
      px={8}
      bgGradient={bgGradient}
      borderTop="1px solid"
      borderColor={useColorModeValue('purple.100', 'purple.700')}
    >
      <Flex justify="space-between" align="center">
        <Text color="purple.700">
          &copy; {new Date().getFullYear()} RememberTogether. All rights reserved.
        </Text>
        <Flex gap={4}>
          <Link
            as={RouterLink}
            to="/privacy"
            color="purple.600"
            _hover={{ color: 'purple.800', textDecoration: 'underline' }}
          >
            Privacy Policy
          </Link>
          <Link
            as={RouterLink}
            to="/terms"
            color="purple.600"
            _hover={{ color: 'purple.800', textDecoration: 'underline' }}
          >
            Terms of Service
          </Link>
          <Link
            as={RouterLink}
            to="/contact"
            color="purple.600"
            _hover={{ color: 'purple.800', textDecoration: 'underline' }}
          >
            Contact Us
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
