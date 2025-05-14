import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CommunityGroupBox from '../components/CommunityGroupBox';

const CommunityPage = () => {
  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Heading textAlign="center" color="teal.600" mb={8}>
        🌐 Create or Join Community
      </Heading>
      <CommunityGroupBox />
    </Box>
  );
};

export default CommunityPage;
