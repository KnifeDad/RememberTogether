import React from 'react';
import { Box, Flex, Heading, Divider } from '@chakra-ui/react';
import AddMemoryForm from '../components/AddMemoryForm';
import MemoryList from '../components/MemoryList';
import MemoryTimeline from '../components/MemoryTimeline';

const MemorySharing = () => {
  return (
    <Flex direction={['column', 'column', 'row']} minH="100vh" p={6} bg="gray.50">
      {/* Left Side: Form + Carousel */}
      <Box flex="3" mr={[0, 0, 6]}>
        <Heading mb={6}>Add & View Memories</Heading>
        <AddMemoryForm />
        <Box mt={10}>
          <MemoryList />
        </Box>
      </Box>

      {/* Divider for desktop view */}
      <Divider orientation="vertical" display={['none', 'none', 'block']} />

      {/* Right Side: Timeline */}
      <Box flex="1" mt={[10, 10, 12]}>
        {' '}
        {/* Increased mt from 10 to 12 */}
        <Box
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          h="100%"
          maxH="500px"
          overflowY="auto"
          sx={{
            '::-webkit-scrollbar': {
              width: '8px',
            },
            '::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(to bottom, purple, pink)',
              borderRadius: '4px',
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: 'linear-gradient(to bottom, pink, purple)',
            },
          }}
        >
          <Heading size="md" mb={4}>
            Memory Timeline
          </Heading>
          <MemoryTimeline />
        </Box>
      </Box>
    </Flex>
  );
};

export default MemorySharing;
