import React, { useState } from 'react';
import { Box, Flex, Link, Button, Text, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal';

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" py={4} px={8} bg="white" shadow="sm">
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          RememberTogether
        </Link>

        <Flex align="center" gap={4}>
          {isAuthenticated ? (
            <>
              <Text fontWeight="medium">Hi, {user?.username}</Text>
              <Button onClick={logout} colorScheme="red" variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={onOpen}>
              Get Started
            </Button>
          )}
        </Flex>
      </Flex>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Header;
