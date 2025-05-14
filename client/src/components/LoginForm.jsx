import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import { LOGIN_USER } from '../utils/mutation';

function LoginForm({ onLoginSuccess }) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login: loginData }) => {
      const { token, user } = loginData;
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      login(token); // ✅ Important: update context so Header shows username
      if (onLoginSuccess) onLoginSuccess();
    },
    onError: (err) => {
      setErrorMessage(err.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    await loginUser({ variables: formState });
  };

  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('purple.200', 'purple.700');
  const inputFocusBorder = useColorModeValue('purple.500', 'purple.300');

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch" bg={inputBg} p={6} borderRadius="lg" boxShadow="md">
        <FormControl isRequired>
          <FormLabel color={useColorModeValue('purple.700', 'purple.200')}>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Enter your email"
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: inputFocusBorder }}
            _focus={{ borderColor: inputFocusBorder, boxShadow: `0 0 0 1px ${inputFocusBorder}` }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={useColorModeValue('purple.700', 'purple.200')}>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formState.password}
              onChange={handleChange}
              placeholder="Enter your password"
              bg={inputBg}
              borderColor={inputBorder}
              _hover={{ borderColor: inputFocusBorder }}
              _focus={{ borderColor: inputFocusBorder, boxShadow: `0 0 0 1px ${inputFocusBorder}` }}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                color={useColorModeValue('purple.600', 'purple.200')}
                _hover={{ bg: 'transparent', color: 'pink.500' }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <Button
          type="submit"
          colorScheme="purple"
          size="lg"
          width="full"
          mt={2}
          isLoading={loading}
          bgGradient="linear(to-r, purple.600, pink.600)"
          _hover={{
            bgGradient: 'linear(to-r, purple.500, pink.500)',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
        >
          Sign In
        </Button>
      </VStack>
    </form>
  );
}

export default LoginForm;
