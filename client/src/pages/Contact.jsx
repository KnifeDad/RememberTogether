import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast({
      title: 'Message Sent',
      description: 'We&apos;ll get back to you as soon as possible.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, purple.600, pink.600)"
            bgClip="text"
            mb={4}
          >
            Contact Us
          </Heading>
          <Text fontSize="lg" color={textColor}>
            We&apos;re here to listen and help
          </Text>
        </Box>

        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="sm">
          <VStack spacing={8} align="stretch">
            <Box>
              <Text color={textColor} fontSize="lg" mb={6}>
                At RememberTogether, we understand that reaching out can be difficult. Whether you
                have questions about our platform, need technical support, or want to share your
                experience, we&apos;re here to help. Our team is committed to providing
                compassionate and timely responses to all inquiries.
              </Text>
            </Box>

            <Box>
              <VStack spacing={4} align="stretch">
                <Box display="flex" alignItems="center" gap={3}>
                  <Icon as={FaEnvelope} color="purple.500" boxSize={5} />
                  <Text color={textColor}>support@remembertogether.com</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={3}>
                  <Icon as={FaPhone} color="purple.500" boxSize={5} />
                  <Text color={textColor}>(555) 123-4567</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={3}>
                  <Icon as={FaMapMarkerAlt} color="purple.500" boxSize={5} />
                  <Text color={textColor}>123 Memory Lane, Suite 456, City, State 12345</Text>
                </Box>
              </VStack>
            </Box>

            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  _hover={{
                    bgGradient: 'linear(to-r, purple.600, pink.600)',
                  }}
                >
                  Send Message
                </Button>
              </VStack>
            </Box>

            <Box>
              <Text color={textColor} fontSize="sm">
                For urgent matters or if you&apos;re experiencing a mental health crisis, please
                contact a mental health professional or call the National Crisis Hotline at 988.
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Contact;
