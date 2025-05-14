import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Icon, HStack, Tooltip } from '@chakra-ui/react';
import { BsCircleFill } from 'react-icons/bs';

const MemoryTimeline = () => {
  const [memories, setMemories] = useState([]);

  const loadMemories = () => {
    const stored = JSON.parse(localStorage.getItem('memories')) || [];
    setMemories(stored);
  };

  useEffect(() => {
    loadMemories();

    const handleStorageChange = () => {
      loadMemories();
    };

    // Listen to changes in localStorage (for cross-tab updates)
    window.addEventListener('storage', handleStorageChange);

    // Fallback polling every 5 seconds (in case storage event doesn't trigger)
    const interval = setInterval(() => {
      loadMemories();
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <VStack align="stretch" spacing={4} pl={4} position="relative">
      {memories.map((mem, index) => (
        <HStack key={index} align="start" spacing={4} position="relative">
          <Box position="relative">
            <Icon as={BsCircleFill} color="purple.400" boxSize={3} mt={1} />
            {index !== memories.length - 1 && (
              <Box
                position="absolute"
                top="10px"
                left="6px"
                width="1px"
                height="calc(100% - 10px)"
                bg="purple.200"
              />
            )}
          </Box>
          <Tooltip label={mem.content} placement="right" hasArrow>
            <Box bg="purple.50" p={2} borderRadius="md" boxShadow="md" maxW="200px">
              <Text fontSize="xs" color="gray.500">
                {new Date(mem.createdAt).toLocaleString()}
              </Text>
              <Text noOfLines={2} fontSize="sm" mt={1}>
                {mem.content}
              </Text>
            </Box>
          </Tooltip>
        </HStack>
      ))}
    </VStack>
  );
};

export default MemoryTimeline;
