import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Box, Text, Spinner, VStack, Heading, Button, useToast } from '@chakra-ui/react';

const MemoryList = () => {
  const toast = useToast();
  const { data, loading, error, refetch } = useQuery(GET_ME);

  const memories = data?.me?.memories || [];

  if (loading) return <Spinner size="xl" mt={10} display="block" mx="auto" />;

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        Failed to load memories.
      </Text>
    );
  }

  return (
    <Box maxW="4xl" mx="auto" px={4} py={8}>
      <Heading size="lg" mb={4} textAlign="center">
        Your Saved Memories
      </Heading>
      <Button
        colorScheme="purple"
        variant="outline"
        mb={6}
        onClick={async () => {
          try {
            await refetch();
            toast({
              title: 'Memories updated.',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          } catch {
            toast({
              title: 'Failed to fetch new data.',
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        }}
      >
        Fetch Latest Memories
      </Button>

      {memories.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No memories yet. Add one!
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {memories.map((memory) => (
            <Box
              key={memory._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg="white"
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ boxShadow: 'md' }}
            >
              <Text fontSize="xs" color="gray.500">
                {new Date(parseInt(memory.createdAt)).toLocaleString()}
              </Text>
              <Text mt={2} fontSize="md" color="gray.700">
                {memory.content}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default MemoryList;
