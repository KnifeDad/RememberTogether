import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Textarea,
  VStack,
  useToast,
  Text,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_MEMORY } from '../utils/mutation';
import { GET_ME } from '../utils/queries';

const AddMemoryForm = () => {
  const [content, setContent] = useState('');
  const [showLocalMemories, setShowLocalMemories] = useState(false);
  const [localMemories, setLocalMemories] = useState([]);
  const toast = useToast();

  const [addMemory, { loading }] = useMutation(ADD_MEMORY, {
    refetchQueries: [{ query: GET_ME }],
    onCompleted: () => {
      const newMemory = {
        content,
        imageUrl: '',
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('memories')) || [];
      existing.unshift(newMemory);
      localStorage.setItem('memories', JSON.stringify(existing));

      setContent('');
      toast({
        title: 'Memory added.',
        description: 'Your memory has been saved!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await addMemory({ variables: { content } });
  };

  const handleShowLocalMemories = () => {
    const stored = JSON.parse(localStorage.getItem('memories')) || [];
    setLocalMemories(stored);
    setShowLocalMemories(true);
  };

  const handleDeleteMemory = (indexToDelete) => {
    const updatedMemories = localMemories.filter((_, index) => index !== indexToDelete);
    setLocalMemories(updatedMemories);
    localStorage.setItem('memories', JSON.stringify(updatedMemories));
  };

  return (
    <>
      {/* Memory Form */}
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={4}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        maxW="lg"
        mx="auto"
        mb={8}
      >
        <VStack spacing={3}>
          <FormControl>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              resize="none"
              minH="100px"
              bg="gray.50"
              _focus={{ bg: 'white' }}
              borderRadius="md"
            />
          </FormControl>

          <HStack spacing={3} align="center" justify="flex-end" w="full">
            <Button
              size="sm"
              colorScheme="purple"
              type="submit"
              isLoading={loading}
              loadingText="Saving..."
              width="90px"
            >
              Post
            </Button>

            <Button
              size="sm"
              colorScheme="pink"
              variant="outline"
              onClick={handleShowLocalMemories}
              width="90px"
            >
              Fetch
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default AddMemoryForm;
