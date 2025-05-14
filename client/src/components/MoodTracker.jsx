import React, { useState } from 'react';
import {
  Box,
  Select,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
  VStack,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [moodData, setMoodData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management

  const handleMoodChange = (e) => setMood(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return;

    const newMood = {
      date: new Date().toLocaleDateString(),
      mood,
    };
    setMoodData([...moodData, newMood]);
    setMood('');
  };

  const moodMapping = {
    excited: 5,
    happy: 4,
    calm: 3,
    neutral: 2,
    sad: 1,
    angry: 0,
    anxious: -1,
  };

  const graphData = moodData.map((entry) => ({
    date: entry.date,
    moodValue: moodMapping[entry.mood] || 0, // Map mood to its numerical value
  }));

  return (
    <Box bg="lightblue" minHeight="100vh" p={8}> {/* Light blue background */}
      <VStack spacing={12} align="center" justify="center" width="100%">
        {/* Mood Bar */}
        <Box width="90%">
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Mood Bar
          </Text>
          <Progress value={70} size="2xl" colorScheme="purple" borderRadius="md" />
        </Box>

        {/* Mood Input Form */}
        <Box as="form" onSubmit={handleSubmit} display="flex" alignItems="center" gap={4} mb={6}>
          <Select
            value={mood}
            onChange={handleMoodChange}
            placeholder="Mood"
            size="lg"
            width="200px"
          >
            <option value="excited">Excited</option>
            <option value="happy">Happy</option>
            <option value="calm">Calm</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
          </Select>
          <Button type="submit" colorScheme="blue" size="lg" padding="8">
            Add
          </Button>
        </Box>

        {/* Button to Open Modal */}
        <Button onClick={onOpen} colorScheme="teal" size="lg" padding="8" width="300px" mb={6}>
          View Mood Tracker Graph
        </Button>

        {/* Modal for Graph Visualization */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Mood Tracker Visualization</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {moodData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="moodValue" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Text fontSize="lg">No mood data available. Add a mood to see the graph.</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} colorScheme="blue" size="lg" padding="8">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default MoodTracker;