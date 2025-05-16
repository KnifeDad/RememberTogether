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
  DrawerBody,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react'; // Import Drawer components
import { BsStars } from 'react-icons/bs';
import { FaAddressBook, FaPaintBrush, FaSmileBeam } from 'react-icons/fa';
import { FaCameraRetro } from 'react-icons/fa';
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
          <Button
            as={RouterLink}
            to="/community"
            leftIcon={<FaAddressBook />}
            colorScheme="purple"
            variant="solid"
            size="md"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{
              bgGradient: 'linear(to-r, purple.600, pink.600)',
            }}
          >
            Community
          </Button>
          <Button
            as={RouterLink}
            to="/my-mood"
            leftIcon={<FaSmileBeam />}
            colorScheme="purple"
            variant="solid"
            size="md"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{
              bgGradient: 'linear(to-r, purple.600, pink.600)',
            }}
          >
            Mood Tracker
          </Button>

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
          <Button
            as={RouterLink}
            to="/my-memories"
            leftIcon={<FaCameraRetro />}
            colorScheme="purple"
            variant="solid"
            size="md"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{
              bgGradient: 'linear(to-r, purple.600, pink.600)',
            }}
          >
            My Memories
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

          {isAuthenticated && user ? (
            <>
              <Text fontWeight="medium" color="purple.700">
                Welcome, {user?.username}
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
        <DrawerContent
          bgGradient="linear(to-b, pink.50, purple.50)"
          borderRadius="lg"
          boxShadow="2xl"
          overflow="hidden"
        >
          <DrawerCloseButton
            top={4}
            right={4}
            color="gray.600"
            _hover={{ color: 'purple.500', transform: 'scale(1.1)' }}
          />

          {/* Header with icon and text */}
          <Box
            py={5}
            px={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            bgGradient="linear(to-r, purple.500, pink.400)"
          >
            <Flex justify="center" align="center" gap={2}>
              <BsStars size={24} color="white" />
              <Heading as="h2" size="md" color="white">
                Kristyn.AI
              </Heading>
            </Flex>
          </Box>

          {/* Body with smooth scroll and elegant bg */}
          <DrawerBody
            p={0}
            bg="whiteAlpha.900"
            overflowY="auto"
            sx={{
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Box p={4}>
              <ChatUI />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Header;
