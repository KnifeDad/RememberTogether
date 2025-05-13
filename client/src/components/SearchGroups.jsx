import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_GROUPS } from '../graphql/queries';
import { Input, Button, VStack, Text, Box } from '@chakra-ui/react';

const SearchGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [getGroups, { data, loading }] = useLazyQuery(GET_GROUPS);

  const handleSearch = () => {
    getGroups({ variables: { search: searchTerm } });
  };

  return (
    <Box p={4}>
      <Input
        placeholder="Search for groups"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button mt={2} onClick={handleSearch} colorScheme="blue" isLoading={loading}>
        Search
      </Button>
      <VStack align="start" mt={4} spacing={3}>
        {data?.groups?.map(group => (
          <Box key={group.id} p={3} borderWidth={1} rounded="md" w="100%">
            <Text fontWeight="bold">{group.name}</Text>
            <Text>{group.description}</Text>
            <Text fontSize="sm" color="gray.500">
              Created by: {group.createdBy.username}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SearchGroups;
