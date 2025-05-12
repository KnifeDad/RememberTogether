import {
  Box,
  Flex,
  Link,
  Button,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react'; // Import Drawer components
import { BsStars } from 'react-icons/bs';
import { FaPaintBrush } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal';
import ChatUI from '../ChatUI';
import MoodTracker from '../MoodTracker'; // Import MoodTracker component

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();

  const bgGradient = useColorModeValue(
    'linear(to-r, purple.50, pink.50)',
    'linear(to-r, purple.900, pink.900)'
  );

  console.log('User:', user); // Log user data for debugging

  return (
    <Box
      as="header"
      py={4}
      px={8}
      bgGradient={bgGradient}
      borderBottom="1px solid"
      borderColor={useColorModeValue('purple.100', 'purple.700')}
    >
      <Flex justify="space-between" align="center">
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
          _hover={{ textDecoration: 'none' }}
        >
          RememberTogether
        </Link>

        <Flex align="center" gap={4}>
          {/* Mood Tracker */}
          <MoodTracker />

          {/* Healing Canvas Button */}
          <Button
            as={RouterLink}
            to="/healing-canvas"
            leftIcon={<FaPaintBrush />}
            colorScheme="purple"
            variant="solid"
            size="md"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{
              bgGradient: 'linear(to-r, purple.600, pink.600)',
            }}
          >
            Healing Canvas
          </Button>

          {/* Button to open Chat Drawer */}
          <Button
            leftIcon={<BsStars />}
            colorScheme="purple"
            variant="outline"
            size="md"
            borderColor="purple.500"
            _hover={{
              bgGradient: 'linear(to-r, purple.500, pink.500)',
              color: 'white',
            }}
            onClick={onChatOpen}
          >
            Open Chat
          </Button>

          {isAuthenticated ? (
            <>
              <Text fontWeight="medium" color="purple.700">
                Hi, {user?.username}
              </Text>
              <Button
                onClick={logout}
                colorScheme="purple"
                variant="outline"
                borderColor="purple.500"
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, pink.500)',
                  color: 'white',
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              colorScheme="purple"
              bgGradient="linear(to-r, purple.500, pink.500)"
              _hover={{
                bgGradient: 'linear(to-r, purple.600, pink.600)',
              }}
              onClick={onOpen}
            >
              Get Started
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Authentication Modal */}
      <AuthModal isOpen={isOpen} onClose={onClose} />

      {/* Chat Drawer */}
      <Drawer isOpen={isChatOpen} placement="right" onClose={onChatClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg="white">
          <DrawerCloseButton />
          <Box p={4} bg="white" borderBottom="1px solid" borderColor="gray.200" position="relative">
            <Heading
              as="h2"
              size="md"
              textAlign="center"
              bgGradient="linear(to-r, purple.600, pink.600)"
              bgClip="text"
            >
              Kristyn.AI
            </Heading>
          </Box>
          <DrawerBody p={0} bg="#FEB2B2">
            {/* ChatUI Component for chat functionality */}
            <ChatUI />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Header;
