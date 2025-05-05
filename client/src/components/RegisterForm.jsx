import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutation';

function RegisterForm({ onRegisterSuccess }) {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      onRegisterSuccess(); // Switch to login form after successful registration
    },
    onError: error => {
      setErrorMessage(error.message);
    },
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');
    await createUser({ variables: { input: formState } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel color="white">Username</FormLabel>
          <Input
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Enter your username"
            bg="white"
            color="black"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="white">Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Enter your email"
            bg="white"
            color="black"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="white">Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Enter your password"
            bg="white"
            color="black"
          />
        </FormControl>

        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <Button
          type="submit"
          colorScheme="whiteAlpha"
          bg="white"
          color="blue.700"
          isLoading={loading}
        >
          Register
        </Button>
      </VStack>
    </form>
  );
}

export default RegisterForm;
