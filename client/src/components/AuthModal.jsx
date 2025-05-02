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
} from '@chakra-ui/react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function AuthModal({ isOpen, onClose }) {
  const [showLogin, setShowLogin] = useState(true); // Start with showing Login by default

  const handleToggle = () => setShowLogin(prev => !prev);
  const handleRegisterSuccess = () => setShowLogin(true); // After registration, show login

  const isLogin = showLogin;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={isLogin ? 'white' : 'blue.700'} color={isLogin ? 'black' : 'white'}>
        <ModalHeader>{isLogin ? 'Login' : 'Register'}</ModalHeader>
        <ModalCloseButton color={isLogin ? 'gray.600' : 'white'} />
        <ModalBody>
          {isLogin ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          )}
          <Box textAlign="center" mt={4}>
            <Button
              size="sm"
              variant="link"
              colorScheme={isLogin ? 'blue' : 'whiteAlpha'}
              onClick={handleToggle}
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
