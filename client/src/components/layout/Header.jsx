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
} from '@chakra-ui/react'; // <-- Import Drawer components
import { BsStars } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal';
import ChatUI from '../ChatUI';

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();

  console.log('User:', user); // Log user data for debugging

  return (
    <Box as="header" py={4} px={8} bg="white" shadow="sm">
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          RememberTogether
        </Link>

        <Flex align="center" gap={4}>
          {/* Button to open Chat Drawer */}
          <Button
            leftIcon={<BsStars />}
            colorScheme="purple"
            variant="solid"
            size="md" // medium built-in size
            px={3} // tighter horizontal padding
            py={2} // tighter vertical padding
            fontSize="md" // medium font
            boxShadow="0 0 10px #9F7AEA, 0 0 20px #9F7AEA"
            _hover={{ boxShadow: '0 0 20px #B794F4, 0 0 30px #B794F4' }}
            onClick={onChatOpen}
          >
            Open Chat
          </Button>

          {isAuthenticated ? (
            <>
              <Text fontWeight="medium">Hi, {user?.username}</Text>
              <Button onClick={logout} colorScheme="red" variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={onOpen}>
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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Kristyn.AI</DrawerHeader>
          <DrawerBody p={0}>
            {/* ChatUI Component for chat functionality */}
            <ChatUI />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Header;
