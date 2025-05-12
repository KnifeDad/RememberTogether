import React from 'react';
import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

function PrivacyPolicy() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

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
            Privacy Policy
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </Box>

        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Introduction
              </Heading>
              <Text color={textColor}>
                At RememberTogether, we understand the sensitive nature of grief and memory
                preservation. We are committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how we collect, use, and
                safeguard your data when you use our platform.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Information We Collect
              </Heading>
              <Text color={textColor} mb={4}>
                We collect information that you provide directly to us, including:
              </Text>
              <VStack align="stretch" spacing={3} pl={4}>
                <Text color={textColor}>• Account information (username, email)</Text>
                <Text color={textColor}>• Memories and stories you choose to share</Text>
                <Text color={textColor}>• Artwork created in the Healing Canvas</Text>
                <Text color={textColor}>• Chat interactions with Kristyn.AI</Text>
                <Text color={textColor}>• Mood tracking data</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                How We Use Your Information
              </Heading>
              <Text color={textColor} mb={4}>
                We use your information to:
              </Text>
              <VStack align="stretch" spacing={3} pl={4}>
                <Text color={textColor}>• Provide and improve our services</Text>
                <Text color={textColor}>• Personalize your experience</Text>
                <Text color={textColor}>• Communicate with you about your account</Text>
                <Text color={textColor}>• Ensure platform security</Text>
                <Text color={textColor}>• Analyze and improve our services</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Data Security
              </Heading>
              <Text color={textColor}>
                We implement appropriate security measures to protect your personal information.
                Your memories and artwork are stored securely, and we regularly review our security
                practices to ensure your data remains protected.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Your Rights
              </Heading>
              <Text color={textColor} mb={4}>
                You have the right to:
              </Text>
              <VStack align="stretch" spacing={3} pl={4}>
                <Text color={textColor}>• Access your personal information</Text>
                <Text color={textColor}>• Correct inaccurate data</Text>
                <Text color={textColor}>• Request deletion of your data</Text>
                <Text color={textColor}>• Export your data</Text>
                <Text color={textColor}>• Opt-out of communications</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Contact Us
              </Heading>
              <Text color={textColor}>
                If you have any questions about this Privacy Policy or our data practices, please
                contact us at privacy@remembertogether.com. We are here to help and will respond to
                your inquiry as soon as possible.
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default PrivacyPolicy;
