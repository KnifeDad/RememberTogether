import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function AuthModal({ isOpen, onClose }) {
  const [showLogin, setShowLogin] = useState(true);
  const gradient = useColorModeValue(
    'linear(to-br, purple.100, pink.100)',
    'linear(to-br, purple.900, pink.900)'
  );

  const handleToggle = () => setShowLogin((prev) => !prev);
  const handleRegisterSuccess = () => setShowLogin(true);

  const isLogin = showLogin;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bgGradient={gradient}
        borderRadius="xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor={useColorModeValue('purple.200', 'purple.700')}
      >
        <ModalHeader
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
          fontWeight="bold"
          fontSize="2xl"
          textAlign="center"
          pt={6}
        >
          {isLogin ? 'Welcome Back' : 'Join Our Community'}
        </ModalHeader>
        <ModalCloseButton color={useColorModeValue('purple.600', 'white')} />
        <ModalBody pb={6}>
          {isLogin ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          )}
          <Box textAlign="center" mt={4}>
            <Button
              size="sm"
              variant="link"
              colorScheme="purple"
              onClick={handleToggle}
              _hover={{
                textDecoration: 'none',
                color: 'pink.500',
              }}
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AuthModal;
