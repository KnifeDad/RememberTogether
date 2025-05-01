import React from 'react';
import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box as="header" py={4} px={8} bg="white">
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          RememberTogether
        </Link>
        
        <Flex gap={4}>
          {isAuthenticated ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <>
              <Link as={RouterLink} to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link as={RouterLink} to="/register">
                <Button colorScheme="blue">Register</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header; 