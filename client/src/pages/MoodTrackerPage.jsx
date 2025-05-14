import React from 'react';
import MoodTracker from '../components/MoodTracker'; // Adjust the path if necessary
import { Flex } from '@chakra-ui/react'; // Import Chakra UI's Flex component

function MoodTrackerPage() {
  return (
    <Flex
      height="100vh" // Full viewport height
      justifyContent="center" // Center horizontally
      alignItems="center" // Center vertically
      bgGradient="linear(to-r, purple.50, pink.50)" // Optional background gradient
    >
      <MoodTracker />
    </Flex>
  );
}

export default MoodTrackerPage;