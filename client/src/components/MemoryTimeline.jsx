import React, { forwardRef } from 'react';
import { Box, VStack, Text, Icon, HStack, Tooltip, Badge } from '@chakra-ui/react';
import { BsCircleFill } from 'react-icons/bs';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const CircleFillWithRef = forwardRef((props, ref) => <BsCircleFill {...props} ref={ref} />);
CircleFillWithRef.displayName = 'CircleFillWithRef';

const categoryColors = {
  Family: 'blue',
  Travel: 'green',
  Work: 'orange',
  Personal: 'purple',
  Health: 'teal',
  Education: 'cyan',
  Hobbies: 'pink',
};

const MemoryTimeline = () => {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Text>Loading memories...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="red.500">Error loading memories</Text>
      </Box>
    );
  }

  const memories = data?.getMe?.memories || [];

  return (
    <Box position="relative" py={8}>
      <VStack spacing={8} align="stretch">
        {memories.map((memory) => (
          <Box
            key={memory._id}
            position="relative"
            pl={8}
            _before={{
              content: '""',
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '0',
              width: '2px',
              bg: `${categoryColors[memory.category || 'Personal']}.200`,
            }}
          >
            <Tooltip label={new Date(memory.createdAt).toLocaleString()}>
              <Icon
                as={CircleFillWithRef}
                position="absolute"
                left="-4px"
                top="0"
                color={`${categoryColors[memory.category || 'Personal']}.500`}
                boxSize={4}
              />
            </Tooltip>
            <Box
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              position="relative"
              _hover={{ boxShadow: 'md' }}
              borderLeft="4px solid"
              borderColor={`${categoryColors[memory.category || 'Personal']}.500`}
            >
              <VStack align="start" spacing={2}>
                <Text fontSize="sm" color="gray.500">
                  {new Date(memory.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                {memory.category && (
                  <Badge
                    colorScheme={categoryColors[memory.category]}
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                  >
                    {memory.category}
                  </Badge>
                )}
                <Text>{memory.content}</Text>
              </VStack>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default MemoryTimeline;
