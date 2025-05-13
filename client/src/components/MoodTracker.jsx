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
    <Box>
      {/* Mood Input Form */}
      <Box as="form" onSubmit={handleSubmit} display="flex" alignItems="center" gap={2} mb={4}>
        <Select value={mood} onChange={handleMoodChange} placeholder="Mood" size="sm" width="120px">
          <option value="excited">Excited</option>
          <option value="happy">Happy</option>
          <option value="calm">Calm</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="anxious">Anxious</option>
        </Select>
        <Button type="submit" colorScheme="blue" size="sm">
          Add
        </Button>
      </Box>

      {/* Button to Open Modal */}
      <Button onClick={onOpen} colorScheme="teal" size="sm" mb={4}>
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
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="moodValue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Text>No mood data available. Add a mood to see the graph.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MoodTracker;
