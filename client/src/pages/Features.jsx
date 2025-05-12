import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Image,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  FaHeart,
  FaUsers,
  FaBook,
  FaPaintBrush,
  FaRobot,
  FaLock,
  FaComments,
} from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';

const FeatureSection = ({ icon, title, description, benefits }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('purple.200', 'purple.700');

  return (
    <Box
      p={8}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      <Icon as={icon} w={10} h={10} color="purple.500" mb={4} />
      <Heading size="lg" mb={4} bgGradient="linear(to-r, purple.600, pink.600)" bgClip="text">
        {title}
      </Heading>
      <Text color="gray.600" mb={6}>
        {description}
      </Text>
      <List spacing={3}>
        {benefits.map((benefit, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <ListIcon as={MdCheckCircle} color="purple.500" />
            <Text>{benefit}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const Features = () => {
  const gradient = useColorModeValue(
    'linear(to-br, purple.100, pink.100)',
    'linear(to-br, purple.900, pink.900)'
  );

  const features = [
    {
      icon: FaRobot,
      title: 'Kristyn.AI - Your Compassionate Companion',
      description:
        'Meet Kristyn, your 24/7 AI companion who provides emotional support and understanding through your journey.',
      benefits: [
        'Built-in AI assistant for engaging and supportive conversations',
        'Emotional intelligence to understand and respond to your feelings',
        'Personalized, empathetic responses tailored to your mood',
        'Creative expression support through poems and stories',
      ],
    },
    {
      icon: FaHeart,
      title: 'Emotional Support Network',
      description:
        'Connect with others who understand your journey and find comfort in shared experiences.',
      benefits: [
        'Safe and moderated community',
        'Share experiences and stories',
        'Find support from people who understand',
        'Build meaningful connections',
      ],
    },
    {
      icon: FaBook,
      title: 'Memory Preservation',
      description: 'Create and preserve precious memories through our digital memory book feature.',
      benefits: [
        'Upload photos and videos',
        'Add personal stories and notes',
        'Create themed collections',
        'Share memories with loved ones',
      ],
    },
    {
      icon: FaPaintBrush,
      title: 'Healing Canvas',
      description: 'Express your emotions through our therapeutic digital art space.',
      benefits: [
        'Digital art tools and brushes',
        'Create memorial art pieces',
        'Express emotions through creativity',
        'Save and share your artwork',
      ],
    },
    {
      icon: FaComments,
      title: 'Support Groups',
      description: 'Join specialized support groups based on your specific needs and experiences.',
      benefits: [
        'Topic-based discussion groups',
        'Professional moderation',
        'Regular group activities',
        'Private and secure environment',
      ],
    },
    {
      icon: FaLock,
      title: 'Privacy & Security',
      description:
        'Your privacy and security are our top priorities. We ensure your data and memories are protected.',
      benefits: [
        'End-to-end encryption',
        'Privacy controls',
        'Secure data storage',
        'Regular security updates',
      ],
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={gradient}
        py={20}
        px={4}
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, purple.600, pink.600)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Discover Our Features
            </Heading>
            <Text fontSize="xl" maxW="2xl" color="gray.600">
              Explore the comprehensive tools and resources designed to support you through your
              healing journey.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {features.map((feature, index) => (
            <FeatureSection key={index} {...feature} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;
