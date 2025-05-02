import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import { LOGIN_USER } from '../utils/mutation';

function LoginForm({ onLoginSuccess }) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login: loginData }) => {
      const { token, user } = loginData;
      localStorage.setItem('id_token', token);
      login(user);
      if (onLoginSuccess) onLoginSuccess();
    },
    onError: err => {
      setErrorMessage(err.message);
    },
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');
    await loginUser({ variables: formState });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </FormControl>

        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Login
        </Button>
      </VStack>
    </form>
  );
}

export default LoginForm;
