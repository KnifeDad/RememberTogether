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
  Spinner,
} from '@chakra-ui/react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_MEMORY } from '../utils/mutation';
import { GET_MEMORIES } from '../utils/queries';

const AddMemoryForm = () => {
  const [content, setContent] = useState('');
  const toast = useToast();

  // Mutation to add a new memory
  const [addMemory, { loading: adding }] = useMutation(ADD_MEMORY, {
    onCompleted: () => {
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

  // Lazy query to fetch memories on button click
  const [fetchMemories, { called, loading: fetching, data, error }] = useLazyQuery(GET_MEMORIES);
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await addMemory({ variables: { content } });
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
              isLoading={adding}
              loadingText="Saving..."
              width="90px"
            >
              Post
            </Button>

            <Button
              size="sm"
              colorScheme="pink"
              variant="outline"
              onClick={() => fetchMemories({ variables: { userId } })} // Trigger fetch
              width="90px"
              isLoading={fetching}
              loadingText="Fetching"
            >
              Fetch
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Display Fetched Memories */}
      {called && (
        <Box maxW="4xl" mx="auto" p={4}>
          <Text fontSize="xl" mb={4} fontWeight="bold">
            My Memories from DB
          </Text>

          {/* Show spinner while fetching */}
          {fetching ? (
            <Spinner />
          ) : error ? (
            // Show error message if there's an error while fetching
            <Text color="red.500">Error: {error.message}</Text>
          ) : (
            // Display memories if fetched successfully
            <SimpleGrid columns={[1, 2]} spacing={4}>
              {data?.memories?.map((memory) => (
                <Box
                  key={memory._id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="gray.50"
                  boxShadow="md"
                >
                  <Text>{memory.content}</Text>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    {new Date(memory.createdAt).toLocaleString()}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </>
  );
};

export default AddMemoryForm;
