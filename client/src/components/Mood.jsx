import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Collapse,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { SAVE_MOOD } from '../utils/mutation';

const categories = [
  {
    name: 'Health',
    questions: [
      {
        q: 'How do you feel physically today?',
        options: ['Energetic', 'Tired', 'Sick', 'Well-rested'],
      },
    ],
  },
  {
    name: 'Work',
    questions: [
      {
        q: 'How productive were you?',
        options: ['Very', 'Somewhat', 'Not much', 'Burnt out'],
      },
    ],
  },
  {
    name: 'Social',
    questions: [
      {
        q: 'How connected do you feel?',
        options: ['Connected', 'Lonely', 'Supported', 'Ignored'],
      },
    ],
  },
  {
    name: 'Emotional',
    questions: [
      {
        q: 'What best describes your mood?',
        options: ['Happy', 'Anxious', 'Sad', 'Calm'],
      },
    ],
  },
  {
    name: 'Chores',
    questions: [
      {
        q: 'Did you complete your tasks?',
        options: ['All done', 'Some', 'None', 'Avoided'],
      },
    ],
  },
];

// Soft pastel gradients
const gradient = {
  base: 'linear(to-r, teal.50, blue.50)',
  selected: 'linear(to-r, teal.300, blue.300)',
  accent: 'linear(to-r, purple.400, pink.400)',
};

const MoodTracker = () => {
  const toast = useToast();
  const [responses, setResponses] = useState({});
  const [expanded, setExpanded] = useState(null);

  const [saveMood, { loading }] = useMutation(SAVE_MOOD, {
    onCompleted: () => {
      toast({
        title: 'Mood saved!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setResponses({});
    },
    onError: (err) => {
      toast({
        title: 'Error saving mood',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSelect = (cat, q, option) => {
    setResponses((prev) => ({
      ...prev,
      [`${cat}_${q}`]: option,
    }));
  };

  const handleSubmit = () => {
    const formatted = Object.entries(responses).map(([key, answer]) => {
      const [category, ...questionParts] = key.split('_');
      const question = questionParts.join('_');
      return { category, question, answer };
    });
    saveMood({ variables: { responses: formatted } });
  };

  return (
    <Box p={8} maxW="850px" mx="auto" bg="white" borderRadius="2xl" boxShadow="xl" mt={10}>
      <Heading size="lg" textAlign="center" mb={6} bgGradient={gradient.accent} bgClip="text">
        Mood Tracker
      </Heading>
      <VStack spacing={6} align="stretch">
        {categories.map((cat, index) => (
          <Box key={cat.name} borderWidth="1px" borderRadius="lg" p={4} bg="gray.50" boxShadow="md">
            <Button
              variant="ghost"
              fontWeight="bold"
              fontSize="lg"
              width="full"
              justifyContent="space-between"
              onClick={() => setExpanded(index === expanded ? null : index)}
              rightIcon={
                expanded === index ? <Icon as={ChevronUpIcon} /> : <Icon as={ChevronDownIcon} />
              }
            >
              {cat.name}
            </Button>
            <Collapse in={expanded === index} animateOpacity>
              <VStack align="start" mt={4} spacing={4}>
                {cat.questions.map((q) => (
                  <Box key={q.q} w="100%">
                    <Text fontWeight="medium" mb={2}>
                      {q.q}
                    </Text>
                    <HStack spacing={3} wrap="wrap">
                      {q.options.map((option) => {
                        const isSelected = responses[`${cat.name}_${q.q}`] === option;
                        return (
                          <Button
                            key={option}
                            size="sm"
                            fontWeight="normal"
                            borderRadius="full"
                            px={4}
                            py={2}
                            bgGradient={isSelected ? gradient.selected : gradient.base}
                            _hover={{
                              bgGradient: gradient.selected,
                            }}
                            onClick={() => handleSelect(cat.name, q.q, option)}
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Collapse>
          </Box>
        ))}
        <Button
          size="lg"
          width="full"
          isLoading={loading}
          borderRadius="xl"
          boxShadow="md"
          bgGradient={gradient.accent}
          color="white"
          _hover={{
            bgGradient: 'linear(to-r, pink.500, purple.500)',
          }}
          onClick={handleSubmit}
        >
          Save Mood
        </Button>
      </VStack>
    </Box>
  );
};

export default MoodTracker;
