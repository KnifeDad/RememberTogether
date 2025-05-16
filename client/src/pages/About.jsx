import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
  Image,
  Link,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FaHeart, FaPaintBrush, FaSmileBeam, FaUsers, FaCameraRetro, FaStar } from 'react-icons/fa';

const Feature = ({ icon, title, description }) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      shadow="lg"
      spacing={4}
      align="start"
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s ease' }}
    >
      <Icon as={icon} w={10} h={10} color="purple.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
    </VStack>
  );
};

const TeamMember = ({ name, role, github, image }) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      shadow="lg"
      spacing={4}
      align="center"
    >
      <Image src={image} alt={name} borderRadius="full" boxSize="150px" objectFit="cover" />
      <Heading size="md">{name}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{role}</Text>
      <Link href={github} isExternal color="purple.500">
        GitHub Profile
      </Link>
    </VStack>
  );
};

function About() {
  const features = [
    {
      icon: FaHeart,
      title: 'Memory Sharing',
      description:
        'Create and share meaningful memories with photos, stories, and special moments. Organize your memories by themes or dates.',
    },
    {
      icon: FaPaintBrush,
      title: 'Healing Canvas',
      description:
        'Express your emotions through digital art. Create visual tributes to loved ones and save your artwork.',
    },
    {
      icon: FaSmileBeam,
      title: 'Mood Tracking',
      description:
        'Monitor your emotional well-being and track your healing progress with our intuitive mood tracking system.',
    },
    {
      icon: FaUsers,
      title: 'Community Support',
      description:
        'Connect with others on similar paths. Share experiences and find comfort in shared understanding.',
    },
    {
      icon: FaCameraRetro,
      title: 'Memory Preservation',
      description:
        'Safely store and organize your precious memories with our secure and intuitive memory management system.',
    },
    {
      icon: FaStar,
      title: 'AI Companion',
      description:
        'Get support and guidance from Kristyn.AI, our compassionate AI companion designed to help you through your journey.',
    },
  ];

  const team = [
    {
      name: 'Guy Ricketts (KnifeDad)',
      role: 'Co-Lead Developer',
      github: 'https://github.com/KnifeDad',
      image: 'https://avatars.githubusercontent.com/KnifeDad',
    },
    {
      name: 'Muhsina Shinwari',
      role: 'Co-Lead Developer',
      github: 'https://github.com/Muhsina-de',
      image: 'https://avatars.githubusercontent.com/Muhsina-de',
    },
    {
      name: 'Steve Agostisi',
      role: 'Developer',
      github: 'https://github.com/Steve-Agostisi',
      image: 'https://avatars.githubusercontent.com/Steve-Agostisi',
    },
    {
      name: 'Maurice Lowery',
      role: 'Developer',
      github: '#',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      {/* Mission Section */}
      <VStack spacing={8} mb={16}>
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
          textAlign="center"
        >
          About RememberTogether
        </Heading>
        <Text
          fontSize="xl"
          color={useColorModeValue('gray.600', 'gray.300')}
          textAlign="center"
          maxW="3xl"
        >
          RememberTogether is more than just an application—it&apos;s a digital sanctuary for those
          navigating the journey of grief and loss. We believe that memories are the threads that
          connect us to our loved ones, and our platform is designed to help you weave these threads
          into a tapestry of healing and remembrance.
        </Text>
      </VStack>

      {/* Features Section */}
      <Box mb={16}>
        <Heading
          as="h2"
          size="xl"
          mb={8}
          textAlign="center"
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
        >
          Our Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </SimpleGrid>
      </Box>

      <Divider my={16} />

      {/* Team Section */}
      <Box>
        <Heading
          as="h2"
          size="xl"
          mb={8}
          textAlign="center"
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
        >
          The Team Behind RememberTogether
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Dedication Section */}
      <Box mt={16} textAlign="center">
        <Heading
          as="h3"
          size="lg"
          mb={4}
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
        >
          In Loving Memory
        </Heading>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
          This project is dedicated to Guy Ricketts&apos; wife, Kristyn Ricketts, who lost her
          courageous battle with Stage 4 breast cancer. Her strength, grace, and love continue to
          inspire us every day. The AI assistant in our application is named in her honor, carrying
          forward her spirit of compassion and understanding.
        </Text>
        <Text mt={4} fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
          In memory of Khair Muhammad, loving uncle to Muhsina Shinwari and in memory of Mr. Lowery,
          loving father to Maurice Lowery.
        </Text>
      </Box>
    </Container>
  );
}

export default About;
