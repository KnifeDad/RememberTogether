import React from 'react';
import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

function TermsOfService() {
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
            Terms of Service
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </Box>

        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Welcome to RememberTogether
              </Heading>
              <Text color={textColor}>
                By accessing or using RememberTogether, you agree to be bound by these Terms of
                Service. We&apos;ve written these terms in a clear and accessible way, recognizing
                the sensitive nature of our platform&apos;s purpose.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Your Account
              </Heading>
              <Text color={textColor} mb={4}>
                To use RememberTogether, you must:
              </Text>
              <VStack align="stretch" spacing={3} pl={4}>
                <Text color={textColor}>• Be at least 13 years old</Text>
                <Text color={textColor}>• Provide accurate account information</Text>
                <Text color={textColor}>• Maintain the security of your account</Text>
                <Text color={textColor}>• Not share your account credentials</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Acceptable Use
              </Heading>
              <Text color={textColor} mb={4}>
                We expect all users to:
              </Text>
              <VStack align="stretch" spacing={3} pl={4}>
                <Text color={textColor}>• Respect other users&apos; privacy and feelings</Text>
                <Text color={textColor}>• Share content that is appropriate and respectful</Text>
                <Text color={textColor}>• Not use the platform for commercial purposes</Text>
                <Text color={textColor}>• Not engage in harassment or harmful behavior</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Content Guidelines
              </Heading>
              <Text color={textColor}>
                RememberTogether is a space for healing and memory preservation. We ask that you:
              </Text>
              <VStack align="stretch" spacing={3} pl={4} mt={4}>
                <Text color={textColor}>• Share memories and stories respectfully</Text>
                <Text color={textColor}>• Be mindful of others&apos; grief journeys</Text>
                <Text color={textColor}>• Not share content that could be triggering</Text>
                <Text color={textColor}>• Respect copyright and intellectual property</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                AI Assistant Guidelines
              </Heading>
              <Text color={textColor}>
                Our AI assistant, Kristyn, is designed to provide compassionate support. While she
                can offer comfort and guidance, she is not a replacement for professional mental
                health services. We encourage you to seek professional help if needed.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Changes to Terms
              </Heading>
              <Text color={textColor}>
                We may update these terms from time to time. We will notify you of any significant
                changes via email or through the platform. Your continued use of RememberTogether
                after such changes constitutes acceptance of the new terms.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="purple.600">
                Contact Us
              </Heading>
              <Text color={textColor}>
                If you have any questions about these Terms of Service, please contact us at
                terms@remembertogether.com. We&apos;re here to help and will respond to your inquiry
                as soon as possible.
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default TermsOfService;
