import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from '../graphql/mutations';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react';

const CreateGroupForm = ({ userId }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [createGroup, { loading }] = useMutation(CREATE_GROUP);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createGroup({
        variables: {
          name: formData.name,
          description: formData.description,
          createdBy: userId
        }
      });
      toast({ title: 'Group created!', status: 'success', duration: 2000 });
      setFormData({ name: '', description: '' });
    } catch (err) {
      toast({ title: 'Error creating group.', status: 'error', duration: 2000 });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} boxShadow="md" rounded="md">
      <FormControl id="name" isRequired>
        <FormLabel>Group Name</FormLabel>
        <Input name="name" value={formData.name} onChange={handleChange} />
      </FormControl>

      <FormControl id="description" mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" value={formData.description} onChange={handleChange} />
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
        Create Group
      </Button>
    </Box>
  );
};

export default CreateGroupForm;
