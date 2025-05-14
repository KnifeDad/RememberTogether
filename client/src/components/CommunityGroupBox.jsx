import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  HStack,
  IconButton,
  Text,
  useToast,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FaTrashAlt, FaHeart } from 'react-icons/fa';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GROUPS } from '../utils/queries';
import { CREATE_GROUP, JOIN_GROUP, DELETE_GROUP } from '../utils/mutation';

const CommunityGroupBox = () => {
  const { loading, data, refetch } = useQuery(GET_GROUPS);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [joinGroup] = useMutation(JOIN_GROUP);
  const [deleteGroup] = useMutation(DELETE_GROUP);
  const [groupName, setGroupName] = useState('');
  const toast = useToast();

  const handleCreate = async () => {
    if (!groupName.trim()) return;
    try {
      await createGroup({ variables: { name: groupName } });
      setGroupName('');
      refetch();
      toast({ title: 'Group created!', status: 'success', duration: 3000 });
    } catch (err) {
      toast({ title: 'Error creating group', status: 'error', duration: 3000 });
    }
  };

  const handleJoin = async (groupId) => {
    try {
      await joinGroup({ variables: { groupId } });
      refetch();
      toast({ title: 'Joined group!', status: 'success', duration: 3000 });
    } catch {
      toast({ title: 'Error joining group', status: 'error', duration: 3000 });
    }
  };

  const handleDelete = async (groupId) => {
    try {
      await deleteGroup({ variables: { groupId } });
      refetch();
      toast({ title: 'Group deleted!', status: 'success', duration: 3000 });
    } catch {
      toast({ title: 'Error deleting group', status: 'error', duration: 3000 });
    }
  };

  const bgGradient = useColorModeValue(
    'linear(to-br, purple.200, blue.100)',
    'linear(to-br, purple.700, blue.800)'
  );

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={8}
      borderRadius="2xl"
      boxShadow="lg"
      bgGradient={bgGradient}
      border="1px solid"
      borderColor="purple.100"
    >
      <Heading fontSize="2xl" textAlign="center" color="purple.800" mb={6}>
        Create a Group
      </Heading>
      <HStack>
        <Input
          placeholder="Group name..."
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          bg="whiteAlpha.900"
        />
        <Button colorScheme="purple" onClick={handleCreate}>
          Create
        </Button>
      </HStack>

      <Divider my={6} borderColor="purple.300" />

      <VStack align="stretch" spacing={4}>
        {loading ? (
          <Text>Loading groups...</Text>
        ) : (
          data?.groups?.map((group) => (
            <Box
              key={group._id}
              p={4}
              bg="whiteAlpha.800"
              borderRadius="lg"
              boxShadow="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text fontWeight="bold">{group.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  👥 {group.members.length} member(s)
                </Text>
              </Box>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Join group"
                  icon={<FaHeart />}
                  colorScheme="pink" // Heart icon will be pink
                  variant="ghost"
                  size="sm"
                  onClick={() => handleJoin(group._id)} // Join group action
                />
                <IconButton
                  aria-label="Delete group"
                  icon={<FaTrashAlt />}
                  colorScheme="red"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(group._id)}
                />
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default CommunityGroupBox;
