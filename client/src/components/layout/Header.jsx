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
  Tooltip,
  IconButton,
  VStack,
  useBreakpointValue,
  HStack,
} from '@chakra-ui/react';
import { BsStars } from 'react-icons/bs';
import { FaAddressBook, FaPaintBrush, FaSmileBeam, FaBars, FaInfoCircle } from 'react-icons/fa';
import { FaCameraRetro } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal';
import ChatUI from '../ChatUI';
import MoodTracker from '../MoodTracker';

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();
  const {
    isOpen: isMobileMenuOpen,
    onOpen: onMobileMenuOpen,
    onClose: onMobileMenuClose,
  } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.50, pink.50)',
    'linear(to-r, purple.900, pink.900)'
  );

  const NavigationItems = () => (
    <HStack spacing={4}>
      <Tooltip label="About Us" placement="bottom">
        <IconButton
          as={RouterLink}
          to="/about"
          icon={<FaInfoCircle />}
          colorScheme="purple"
          variant="solid"
          size="md"
          bgGradient="linear(to-r, purple.500, pink.500)"
          _hover={{
            bgGradient: 'linear(to-r, purple.600, pink.600)',
          }}
          aria-label="About Us"
        />
      </Tooltip>

      <Tooltip label="Community" placement="bottom">
        <IconButton
          as={RouterLink}
          to="/community"
          icon={<FaAddressBook />}
          colorScheme="purple"
          variant="solid"
          size="md"
          bgGradient="linear(to-r, purple.500, pink.500)"
          _hover={{
            bgGradient: 'linear(to-r, purple.600, pink.600)',
          }}
          aria-label="Community"
        />
      </Tooltip>

      <Tooltip label="Mood Tracker" placement="bottom">
        <IconButton
          as={RouterLink}
          to="/my-mood"
          icon={<FaSmileBeam />}
          colorScheme="purple"
          variant="solid"
          size="md"
          bgGradient="linear(to-r, purple.500, pink.500)"
          _hover={{
            bgGradient: 'linear(to-r, purple.600, pink.600)',
          }}
          aria-label="Mood Tracker"
        />
      </Tooltip>

      <Tooltip label="Healing Canvas" placement="bottom">
        <IconButton
          as={RouterLink}
          to="/healing-canvas"
          icon={<FaPaintBrush />}
          colorScheme="purple"
          variant="solid"
          size="md"
          bgGradient="linear(to-r, purple.500, pink.500)"
          _hover={{
            bgGradient: 'linear(to-r, purple.600, pink.600)',
          }}
          aria-label="Healing Canvas"
        />
      </Tooltip>

      <Tooltip label="My Memories" placement="bottom">
        <IconButton
          as={RouterLink}
          to="/my-memories"
          icon={<FaCameraRetro />}
          colorScheme="purple"
          variant="solid"
          size="md"
          bgGradient="linear(to-r, purple.500, pink.500)"
          _hover={{
            bgGradient: 'linear(to-r, purple.600, pink.600)',
          }}
          aria-label="My Memories"
        />
      </Tooltip>

      <Tooltip label="Open Chat" placement="bottom">
        <IconButton
          icon={<BsStars />}
          colorScheme="purple"
          variant="outline"
          size="md"
          borderColor="purple.500"
          _hover={{
            bgGradient: 'linear(to-r, purple.500, pink.500)',
            color: 'white',
          }}
          onClick={onChatOpen}
          aria-label="Open Chat"
        />
      </Tooltip>
    </HStack>
  );

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
        {isMobile && (
          <IconButton
            icon={<FaBars />}
            variant="ghost"
            colorScheme="purple"
            onClick={onMobileMenuOpen}
            aria-label="Open menu"
            mr={2}
          />
        )}

        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
          _hover={{ textDecoration: 'none' }}
          flex="1"
          textAlign={isMobile ? 'center' : 'left'}
        >
          RememberTogether
        </Link>

        {!isMobile && (
          <Flex align="center" gap={4}>
            <MoodTracker />
            <NavigationItems />
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
        )}
      </Flex>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isMobileMenuOpen} placement="left" onClose={onMobileMenuClose}>
        <DrawerOverlay />
        <DrawerContent
          bgGradient="linear(to-b, pink.50, purple.50)"
          borderRadius="lg"
          boxShadow="2xl"
        >
          <DrawerCloseButton
            top={4}
            right={4}
            color="gray.600"
            _hover={{ color: 'purple.500', transform: 'scale(1.1)' }}
          />

          <Box
            py={5}
            px={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            bgGradient="linear(to-r, purple.500, pink.400)"
          >
            <Heading as="h2" size="md" color="white" textAlign="center">
              Menu
            </Heading>
          </Box>

          <DrawerBody p={6}>
            <VStack spacing={6} align="stretch">
              <VStack spacing={4} align="stretch" w="full">
                <Tooltip label="About Us" placement="right">
                  <IconButton
                    as={RouterLink}
                    to="/about"
                    icon={<FaInfoCircle />}
                    colorScheme="purple"
                    variant="solid"
                    size="md"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.600, pink.600)',
                    }}
                    aria-label="About Us"
                    w="full"
                  />
                </Tooltip>

                <Tooltip label="Community" placement="right">
                  <IconButton
                    as={RouterLink}
                    to="/community"
                    icon={<FaAddressBook />}
                    colorScheme="purple"
                    variant="solid"
                    size="md"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.600, pink.600)',
                    }}
                    aria-label="Community"
                    w="full"
                  />
                </Tooltip>

                <Tooltip label="Mood Tracker" placement="right">
                  <IconButton
                    as={RouterLink}
                    to="/my-mood"
                    icon={<FaSmileBeam />}
                    colorScheme="purple"
                    variant="solid"
                    size="md"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.600, pink.600)',
                    }}
                    aria-label="Mood Tracker"
                    w="full"
                  />
                </Tooltip>

                <Tooltip label="Healing Canvas" placement="right">
                  <IconButton
                    as={RouterLink}
                    to="/healing-canvas"
                    icon={<FaPaintBrush />}
                    colorScheme="purple"
                    variant="solid"
                    size="md"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.600, pink.600)',
                    }}
                    aria-label="Healing Canvas"
                    w="full"
                  />
                </Tooltip>

                <Tooltip label="My Memories" placement="right">
                  <IconButton
                    as={RouterLink}
                    to="/my-memories"
                    icon={<FaCameraRetro />}
                    colorScheme="purple"
                    variant="solid"
                    size="md"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.600, pink.600)',
                    }}
                    aria-label="My Memories"
                    w="full"
                  />
                </Tooltip>

                <Tooltip label="Open Chat" placement="right">
                  <IconButton
                    icon={<BsStars />}
                    colorScheme="purple"
                    variant="outline"
                    size="md"
                    borderColor="purple.500"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.500, pink.500)',
                      color: 'white',
                    }}
                    onClick={onChatOpen}
                    aria-label="Open Chat"
                    w="full"
                  />
                </Tooltip>
              </VStack>

              {isAuthenticated && user ? (
                <>
                  <Text fontWeight="medium" color="purple.700" textAlign="center">
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

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
