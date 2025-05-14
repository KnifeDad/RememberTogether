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
  Input,
  FormLabel,
  Collapse,
  IconButton,
  Select,
  Switch,
  Image,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useMutation} from '@apollo/client';
import { ADD_MEMORY } from '../utils/mutation';
import { GET_ME } from '../utils/queries';
import { FaClock, FaImage, FaVideo, FaMusic, FaTrash } from 'react-icons/fa';
import { TimeIcon } from '@chakra-ui/icons';

const AddMemoryForm = () => {
  const [content, setContent] = useState('');
  const [showLocalMemories, setShowLocalMemories] = useState(false);
  const [localMemories, setLocalMemories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [category, setCategory] = useState('Personal');
  const [showReminder, setShowReminder] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderType, setReminderType] = useState('one-time');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const toast = useToast();

  const categories = ['Family', 'Travel', 'Work', 'Personal', 'Health', 'Education', 'Hobbies'];

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    const newMediaFiles = [...mediaFiles];
    const newPreviews = [...mediaPreviews];

    files.forEach((file) => {
      const fileType = file.type.split('/')[0];
      if (fileType === 'image' || fileType === 'video' || fileType === 'audio') {
        newMediaFiles.push(file);
        // Create preview for images and videos
        if (fileType === 'image' || fileType === 'video') {
          const reader = new FileReader();
          reader.onload = (e) => {
            newPreviews.push({
              type: fileType,
              url: e.target.result,
              name: file.name,
            });
            setMediaPreviews([...newPreviews]);
          };
          reader.readAsDataURL(file);
        } else {
          // For audio files, just show the filename
          newPreviews.push({
            type: 'audio',
            name: file.name,
          });
          setMediaPreviews([...newPreviews]);
        }
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload only images, videos, or audio files.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });

    setMediaFiles(newMediaFiles);
  };

  const removeMedia = (index) => {
    const newMediaFiles = mediaFiles.filter((_, i) => i !== index);
    const newPreviews = mediaPreviews.filter((_, i) => i !== index);
    setMediaFiles(newMediaFiles);
    setMediaPreviews(newPreviews);
  };

  const [addMemory, { loading }] = useMutation(ADD_MEMORY, {
    refetchQueries: [{ query: GET_ME }],
    onCompleted: () => {
      setContent('');
      setCustomDate('');
      setCategory('Personal');
      setShowDatePicker(false);
      setShowReminder(false);
      setReminderEnabled(false);
      setReminderDate('');
      setReminderType('one-time');
      setMediaFiles([]);
      setMediaPreviews([]);
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
    if (!content.trim() && mediaFiles.length === 0) return;

    const dateToUse = customDate ? new Date(customDate).toISOString() : new Date().toISOString();
    const reminderData = {
      enabled: reminderEnabled,
      date: reminderDate ? new Date(reminderDate).toISOString() : null,
      type: reminderType,
    };

    // TODO: Implement actual file upload to a storage service
    // For now, we'll just create placeholder URLs
    const mediaData = mediaFiles.map((file) => ({
      type: file.type.split('/')[0],
      url: URL.createObjectURL(file),
      size: file.size,
      mimeType: file.type,
    }));

    await addMemory({
      variables: {
        content,
        media: mediaData,
        createdAt: dateToUse,
        category,
        reminder: reminderData,
      },
    });
  };

  return (
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

        <FormControl>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="sm"
            bg="gray.50"
            _focus={{ bg: 'white' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Input
            type="file"
            accept="image/*,video/*,audio/*"
            multiple
            onChange={handleMediaUpload}
            display="none"
            id="media-upload"
          />
          <Button
            as="label"
            htmlFor="media-upload"
            leftIcon={<FaImage />}
            size="sm"
            colorScheme="purple"
            variant="outline"
            cursor="pointer"
            width="full"
          >
            Add Media
          </Button>
        </FormControl>

        {mediaPreviews.length > 0 && (
          <SimpleGrid columns={2} spacing={4} width="full">
            {mediaPreviews.map((preview, index) => (
              <Box
                key={index}
                position="relative"
                borderWidth={1}
                borderRadius="md"
                overflow="hidden"
              >
                {preview.type === 'image' && (
                  <Image
                    src={preview.url}
                    alt={preview.name}
                    objectFit="cover"
                    height="150px"
                    width="full"
                  />
                )}
                {preview.type === 'video' && (
                  <video
                    src={preview.url}
                    controls
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                )}
                {preview.type === 'audio' && (
                  <Flex align="center" justify="center" height="150px" bg="gray.100" p={4}>
                    <Icon as={FaMusic} boxSize={8} color="gray.500" />
                    <Text ml={2} noOfLines={1}>
                      {preview.name}
                    </Text>
                  </Flex>
                )}
                <IconButton
                  aria-label="Remove media"
                  icon={<FaTrash />}
                  size="sm"
                  colorScheme="red"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => removeMedia(index)}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}

        <HStack spacing={3} align="center" justify="space-between" w="full">
          <IconButton
            aria-label="Set custom date"
            icon={<FaClock />}
            size="sm"
            colorScheme="purple"
            variant="ghost"
            onClick={() => setShowDatePicker(!showDatePicker)}
          />
          <HStack spacing={3}>
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
        </HStack>

        <Collapse in={showDatePicker} animateOpacity>
          <FormControl>
            <FormLabel fontSize="sm" color="gray.600">
              Custom Date (optional)
            </FormLabel>
            <Input
              type="datetime-local"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              size="sm"
            />
          </FormControl>
        </Collapse>

        <FormControl>
          <HStack justify="space-between" align="center">
            <FormLabel mb={0}>Set Reminder</FormLabel>
            <Switch
              isChecked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
              colorScheme="pink"
            />
          </HStack>
          <Collapse in={reminderEnabled}>
            <VStack spacing={4} mt={4}>
              <FormControl>
                <FormLabel>Reminder Date</FormLabel>
                <Input
                  type="datetime-local"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  bg="white"
                  _hover={{ borderColor: 'pink.300' }}
                  _focus={{
                    borderColor: 'pink.400',
                    boxShadow: '0 0 0 1px var(--chakra-colors-pink-400)',
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Reminder Type</FormLabel>
                <Select
                  value={reminderType}
                  onChange={(e) => setReminderType(e.target.value)}
                  bg="white"
                  _hover={{ borderColor: 'pink.300' }}
                  _focus={{
                    borderColor: 'pink.400',
                    boxShadow: '0 0 0 1px var(--chakra-colors-pink-400)',
                  }}
                >
                  <option value="one-time">One Time</option>
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                </Select>
              </FormControl>
            </VStack>
          </Collapse>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default AddMemoryForm;