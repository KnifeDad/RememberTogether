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
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { SAVE_MOOD } from '../utils/mutation';

// Categories and their options
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

// Score Mapping
const scoreMapping = {
  Energetic: 5,
  'Well-rested': 4,
  Tired: 2,
  Sick: 1,
  Very: 5,
  Somewhat: 4,
  'Not much': 2,
  'Burnt out': 1,
  Connected: 5,
  Supported: 4,
  Lonely: 2,
  Ignored: 1,
  Happy: 5,
  Calm: 4,
  Anxious: 2,
  Sad: 1,
  'All done': 5,
  Some: 4,
  None: 2,
  Avoided: 1,
};

const MoodTracker = () => {
  const toast = useToast();
  const [responses, setResponses] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [score, setScore] = useState(null);
  const [summary, setSummary] = useState('');

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

  // Handle selecting an option
  const handleSelect = (cat, q, option) => {
    setResponses((prev) => ({
      ...prev,
      [`${cat}_${q}`]: option,
    }));
  };

  // Calculate score and summary based on the responses
  const calculateMoodScore = () => {
    let totalScore = 0;
    let statement = '';

    // Sum up the score based on selected responses
    for (const key in responses) {
      const answer = responses[key];
      totalScore += scoreMapping[answer];

      // Create summary based on the score range
      if (totalScore >= 20) {
        statement = 'You are feeling great!';
      } else if (totalScore >= 15) {
        statement = 'You are doing well, but could use some improvement.';
      } else if (totalScore >= 10) {
        statement = 'You seem a bit down. Consider some self-care.';
      } else {
        statement = 'You may be feeling low. Take time to relax and recharge or talk to Kristyn.AI';
      }
    }

    setScore(totalScore);
    setSummary(statement);
  };

  // Handle submitting the form
  const handleSubmit = () => {
    if (Object.keys(responses).length === 0) {
      toast({
        title: 'No responses',
        description: 'Please answer all questions.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const input = {};

    // Organize responses into categories
    for (const key in responses) {
      const [category, ...questionParts] = key.split('_');
      const question = questionParts.join('_');
      const answer = responses[key];

      input[category.toLowerCase()] = { question, answer };
    }

    saveMood({ variables: { input } });
    calculateMoodScore();
  };

  return (
    <Flex p={4} maxW="700px" mx="auto" bg="white" borderRadius="lg" boxShadow="md" mt={8}>
      <VStack spacing={4} align="stretch" flex="1">
        <Heading size="lg" textAlign="center" mb={4} bgGradient={gradient.accent} bgClip="text">
          Mood Tracker
        </Heading>
        {categories.map((cat, index) => (
          <Box key={cat.name} borderWidth="1px" borderRadius="lg" p={4} bg="gray.50" boxShadow="md">
            <Button
              variant="ghost"
              fontWeight="bold"
              fontSize="md"
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

      {/* Summary Section */}
      <Box
        p={4}
        maxW="300px"
        mx={4}
        bg="gray.50"
        borderRadius="lg"
        boxShadow="md"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading size="md" mb={4}>
          Your Mood Summary
        </Heading>
        <Text fontSize="lg" mb={2}>
          Score: {score}
        </Text>
        <Text
          fontSize="md"
          color={score >= 15 ? 'green.500' : score >= 10 ? 'yellow.500' : 'red.500'}
        >
          {summary}
        </Text>
      </Box>
    </Flex>
  );
};

export default MoodTracker;
