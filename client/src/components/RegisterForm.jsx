import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutation';

function RegisterForm({ onRegisterSuccess }) {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      onRegisterSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const toast = useToast();
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('purple.200', 'purple.700');
  const inputFocusBorder = useColorModeValue('purple.500', 'purple.300');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    await createUser({ variables: { input: formState } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel color={useColorModeValue('purple.700', 'purple.200')}>Username</FormLabel>
          <Input
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: inputFocusBorder }}
            _focus={{ borderColor: inputFocusBorder, boxShadow: `0 0 0 1px ${inputFocusBorder}` }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={useColorModeValue('purple.700', 'purple.200')}>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
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
              bg={inputBg}
              borderColor={inputBorder}
              _hover={{ borderColor: inputFocusBorder }}
              _focus={{ borderColor: inputFocusBorder, boxShadow: `0 0 0 1px ${inputFocusBorder}` }}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                color={useColorModeValue('purple.600', 'purple.200')}
                _hover={{ bg: 'transparent', color: 'pink.500' }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={useColorModeValue('purple.700', 'purple.200')}>
            Confirm Password
          </FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              bg={inputBg}
              borderColor={inputBorder}
              _hover={{ borderColor: inputFocusBorder }}
              _focus={{ borderColor: inputFocusBorder, boxShadow: `0 0 0 1px ${inputFocusBorder}` }}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                color={useColorModeValue('purple.600', 'purple.200')}
                _hover={{ bg: 'transparent', color: 'pink.500' }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          type="submit"
          colorScheme="purple"
          size="lg"
          width="full"
          mt={4}
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
          Create Account
        </Button>
      </VStack>
    </form>
  );
}

export default RegisterForm;
