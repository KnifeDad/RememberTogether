import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_MEMORY } from '../utils/mutations';
import {
  Box,
  Text,
  Spinner,
  VStack,
  Heading,
  Button,
  useToast,
  Skeleton,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
  HStack,
  Badge,
  Tooltip,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaHeart, FaRegHeart, FaTrash, FaMusic } from 'react-icons/fa';
import { useApolloClient } from '@apollo/client';
import { DeleteIcon, BellIcon } from '@chakra-ui/icons';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const categoryColors = {
  Family: 'blue',
  Travel: 'green',
  Work: 'orange',
  Personal: 'purple',
  Health: 'teal',
  Education: 'cyan',
  Hobbies: 'pink',
};

const MemoryList = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memoryToDelete, setMemoryToDelete] = React.useState(null);
  const cancelRef = React.useRef();
  const client = useApolloClient();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data, loading, error, refetch } = useQuery(GET_ME, {
    onCompleted: (data) => {
      console.log('Query completed successfully:', data);
      // Log memories with reminders
      const memoriesWithReminders = data?.getMe?.memories?.filter((m) => m.reminder?.enabled);
      console.log('Memories with reminders:', memoriesWithReminders);
      // Log the full structure of each memory
      data?.getMe?.memories?.forEach((memory, index) => {
        console.log(`Memory ${index} full structure:`, {
          id: memory._id,
          content: memory.content,
          reminder: memory.reminder,
          hasReminder: memory.reminder?.enabled,
          reminderDate: memory.reminder?.date,
          reminderType: memory.reminder?.type,
        });
      });
    },
    onError: (error) => {
      console.error('Query error:', error);
    },
  });

  const [deleteMemory] = useMutation(DELETE_MEMORY, {
    update(cache, { data: { deleteMemory } }) {
      try {
        // Read the current cache data
        const { getMe } = cache.readQuery({ query: GET_ME });
        // Create a new memories array without the deleted memory
        const updatedMemories = getMe.memories.filter(
          (memory) => memory._id !== memoryToDelete._id
        );

        // Write the updated data back to the cache
        cache.writeQuery({
          query: GET_ME,
          data: {
            getMe: {
              ...getMe,
              memories: updatedMemories,
            },
          },
        });
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
    onCompleted: () => {
      toast({
        title: 'Memory deleted.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast({
        title: 'Failed to delete memory.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleDeleteClick = (memory) => {
    setMemoryToDelete(memory);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMemory({
        variables: { id: memoryToDelete._id },
      });
      onClose();
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  console.log('Current state:', { data, loading, error });

  const memories = data?.getMe?.memories || [];
  console.log('All memories:', memories);
  const filteredMemories =
    selectedCategory === 'all'
      ? memories
      : memories.filter((memory) => memory.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatReminderDate = (dateString) => {
    if (!dateString) return '';
    try {
      // Handle Unix timestamp (milliseconds)
      const timestamp = parseInt(dateString);
      if (!isNaN(timestamp)) {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
          console.error('Invalid timestamp:', dateString);
          return 'Invalid date';
        }
        return date.toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      // Handle ISO string
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return 'Invalid date';
      }
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <Box maxW="4xl" mx="auto" px={4} py={8} bg="white" borderRadius="xl" boxShadow="2xl">
        <Skeleton height="40px" mb={6} />
        <VStack spacing={4} align="stretch">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="100px" borderRadius="md" />
          ))}
        </VStack>
      </Box>
    );
  }

  if (error) {
    console.error('Detailed error:', error);
    return (
      <Box
        textAlign="center"
        p={8}
        borderRadius="xl"
        bg="red.50"
        border="2px"
        borderColor="red.200"
        maxW="4xl"
        mx="auto"
        boxShadow="2xl"
      >
        <Icon as={FaHeart} color="red.500" boxSize={8} mb={4} />
        <Text color="red.500" fontSize="lg" fontWeight="medium">
          Failed to load memories.
        </Text>
        <Text color="red.400" mt={2}>
          {error.message || 'Please try again later.'}
        </Text>
        <Button mt={4} colorScheme="red" variant="outline" onClick={() => refetch()}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="4xl" mx="auto" px={4} py={8}>
      <Heading
        size="xl"
        mb={6}
        textAlign="center"
        bgGradient="linear(to-r, purple.600, pink.600)"
        bgClip="text"
        animation={`${fadeIn} 0.5s ease-out`}
        fontWeight="bold"
        letterSpacing="tight"
      >
        Your Saved Memories
      </Heading>

      <Flex justify="space-between" align="center" mb={8}>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          maxW="200px"
          bg="white"
          borderColor="purple.200"
          _hover={{ borderColor: 'purple.300' }}
          _focus={{
            borderColor: 'purple.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
          }}
        >
          <option value="all">All Categories</option>
          {Object.keys(categoryColors).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Button
          size="lg"
          colorScheme="purple"
          variant="outline"
          onClick={async () => {
            try {
              await refetch();
              toast({
                title: 'Memories updated.',
                status: 'success',
                duration: 2000,
                isClosable: true,
              });
            } catch (error) {
              console.error('Refetch error:', error);
              toast({
                title: 'Failed to fetch new data.',
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
            }
          }}
          _hover={{
            bgGradient: 'linear(to-r, purple.500, pink.500)',
            color: 'white',
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          }}
          transition="all 0.3s"
          borderWidth="2px"
        >
          Fetch Latest Memories
        </Button>
      </Flex>

      {filteredMemories.length === 0 ? (
        <Box
          textAlign="center"
          p={10}
          borderRadius="xl"
          bg="purple.50"
          border="2px"
          borderColor="purple.200"
          animation={`${fadeIn} 0.5s ease-out`}
          boxShadow="2xl"
        >
          <Icon as={FaRegHeart} color="purple.500" boxSize={10} mb={4} />
          <Text color="purple.600" fontSize="xl" fontWeight="medium">
            {selectedCategory === 'all' ? 'No memories yet.' : `No ${selectedCategory} memories.`}
          </Text>
          <Text color="purple.500" mt={2} fontSize="lg">
            {selectedCategory === 'all'
              ? 'Start by adding your first memory!'
              : `Try adding a ${selectedCategory} memory!`}
          </Text>
        </Box>
      ) : (
        <VStack spacing={6} align="stretch">
          {filteredMemories.map((memory, index) => {
            console.log('Rendering memory:', memory);
            console.log('Reminder data:', memory.reminder);
            const hasReminder = memory.reminder && memory.reminder.enabled;
            console.log('Has reminder:', hasReminder);
            return (
              <Box
                key={memory._id}
                p={8}
                borderRadius="xl"
                bg="white"
                boxShadow="2xl"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '2xl',
                  bgGradient: 'linear(to-r, purple.50, pink.50)',
                }}
                animation={`${fadeIn} 0.5s ease-out ${index * 0.1}s`}
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  bgGradient: `linear(to-r, ${categoryColors[memory.category || 'Personal']}.500, ${categoryColors[memory.category || 'Personal']}.300)`,
                }}
              >
                <Flex justify="space-between" align="center" mb={3}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium" letterSpacing="wide">
                    {formatDate(memory.createdAt)}
                  </Text>
                  <Flex align="center" gap={2}>
                    <Icon
                      as={FaHeart}
                      color="pink.400"
                      boxSize={5}
                      animation={`${pulse} 2s infinite`}
                    />
                    <IconButton
                      aria-label="Delete memory"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleDeleteClick(memory)}
                      _hover={{ bg: 'red.50' }}
                    />
                  </Flex>
                </Flex>
                <VStack align="start" spacing={2}>
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
                  {hasReminder && (
                    <Tooltip
                      label={`Reminder: ${formatReminderDate(memory.reminder.date)} (${memory.reminder.type})`}
                    >
                      <Badge
                        colorScheme="purple"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                        display="flex"
                        alignItems="center"
                        gap={2}
                        bgGradient="linear(to-r, purple.400, pink.400)"
                        color="white"
                      >
                        <BellIcon />
                        {memory.reminder.type}
                        <Text fontSize="xs" opacity={0.9}>
                          {formatReminderDate(memory.reminder.date)}
                        </Text>
                      </Badge>
                    </Tooltip>
                  )}
                  <Text>{memory.content}</Text>
                  {memory.media && memory.media.length > 0 && (
                    <SimpleGrid columns={2} spacing={4} width="full" mt={2}>
                      {memory.media.map((media, index) => (
                        <Box
                          key={index}
                          position="relative"
                          borderWidth={1}
                          borderRadius="md"
                          overflow="hidden"
                        >
                          {media.type === 'image' && (
                            <Image
                              src={media.url}
                              alt={`Memory image ${index + 1}`}
                              objectFit="cover"
                              height="150px"
                              width="full"
                            />
                          )}
                          {media.type === 'video' && (
                            <video
                              src={media.url}
                              controls
                              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            />
                          )}
                          {media.type === 'audio' && (
                            <Flex
                              align="center"
                              justify="center"
                              height="150px"
                              bg="gray.100"
                              p={4}
                            >
                              <Icon as={FaMusic} boxSize={8} color="gray.500" />
                              <Text ml={2} noOfLines={1}>
                                Audio {index + 1}
                              </Text>
                            </Flex>
                          )}
                        </Box>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              </Box>
            );
          })}
        </VStack>
      )}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent
            bg="pink.50"
            borderRadius="xl"
            boxShadow="2xl"
            p={6}
            border="2px"
            borderColor="purple.200"
          >
            <AlertDialogHeader
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, purple.600, pink.600)"
              bgClip="text"
              textAlign="center"
            >
              Delete Memory
            </AlertDialogHeader>

            <AlertDialogBody textAlign="center" py={4} color="gray.600">
              Are you sure you want to delete this memory? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter justifyContent="center" gap={4}>
              <Button
                ref={cancelRef}
                onClick={onClose}
                size="md"
                px={6}
                bgGradient="linear(to-r, purple.500, pink.500)"
                color="white"
                _hover={{
                  bgGradient: 'linear(to-r, purple.600, pink.600)',
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                }}
                transition="all 0.3s"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteConfirm}
                size="md"
                px={6}
                bgGradient="linear(to-r, red.500, pink.500)"
                color="white"
                _hover={{
                  bgGradient: 'linear(to-r, red.600, pink.600)',
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                }}
                transition="all 0.3s"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MemoryList;
