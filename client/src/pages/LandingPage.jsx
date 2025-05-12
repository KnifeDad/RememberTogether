import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaHeart, FaUsers, FaBook, FaPaintBrush } from 'react-icons/fa';
import AuthModal from '../components/AuthModal';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('purple.200', 'purple.700');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      <Icon as={icon} w={10} h={10} color="purple.500" mb={4} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  );
};

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const gradient = useColorModeValue(
    'linear(to-br, purple.100, pink.100)',
    'linear(to-br, purple.900, pink.900)'
  );

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
              A Safe Space for Healing & Remembering
            </Heading>
            <Text fontSize="xl" maxW="2xl" color="gray.600">
              RememberTogether is your compassionate companion through grief, offering tools for
              memory preservation, support networks, and wellness resources.
            </Text>
            <Button
              size="lg"
              colorScheme="purple"
              bgGradient="linear(to-r, purple.500, pink.500)"
              _hover={{
                bgGradient: 'linear(to-r, purple.600, pink.600)',
              }}
              px={8}
              onClick={onOpen}
            >
              Begin Your Journey
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, purple.600, pink.600)"
            bgClip="text"
          >
            How We Support You
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            <FeatureCard
              icon={FaHeart}
              title="Emotional Support"
              description="Connect with others who understand your journey and find comfort in shared experiences. Our AI companion, Kristyn, is here to listen and support you 24/7."
            />
            <FeatureCard
              icon={FaBook}
              title="Memory Preservation"
              description="Create and preserve precious memories through our digital memory book feature."
            />
            <FeatureCard
              icon={FaUsers}
              title="Support Network"
              description="Build meaningful connections with others navigating similar experiences."
            />
            <FeatureCard
              icon={FaPaintBrush}
              title="Healing Canvas"
              description="Express your emotions through our therapeutic digital art space."
            />
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Call to Action */}
      <Box bgGradient={gradient} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h2"
              size="xl"
              bgGradient="linear(to-r, purple.600, pink.600)"
              bgClip="text"
            >
              Start Your Healing Journey Today
            </Heading>
            <Text fontSize="lg" maxW="2xl" color="gray.600">
              Join our supportive community and discover tools designed to help you navigate grief
              while preserving precious memories.
            </Text>
            <HStack spacing={4}>
              <Button
                size="lg"
                colorScheme="purple"
                bgGradient="linear(to-r, purple.500, pink.500)"
                _hover={{
                  bgGradient: 'linear(to-r, purple.600, pink.600)',
                }}
                onClick={onOpen}
              >
                Sign Up
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="purple"
                onClick={() => navigate('/features')}
              >
                Learn More
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Authentication Modal */}
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default LandingPage;
