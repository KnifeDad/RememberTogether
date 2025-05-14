import React, { useState } from 'react';
import { Box, Select, Button } from '@chakra-ui/react';

const MoodTracker = () => {
  const [mood, setMood] = useState('');

  const handleMoodChange = (e) => setMood(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mood:', mood);
    setMood('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} display="flex" alignItems="center" gap={2}>
      <Select value={mood} onChange={handleMoodChange} placeholder="Mood" size="sm" width="120px">
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="neutral">Neutral</option>
        <option value="angry">Angry</option>
        <option value="anxious">Anxious</option>
        <option value="excited">Excited</option>
        <option value="calm">Calm</option>
      </Select>
      <Button type="submit" colorScheme="blue" size="sm">
        Add
      </Button>
    </Box>
  );
};

export default MoodTracker;
