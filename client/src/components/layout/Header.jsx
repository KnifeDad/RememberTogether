import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { FaBars, FaHome, FaSmileBeam, FaChartLine, FaPaintBrush, FaCameraRetro } from 'react-icons/fa'; // Added FaChartLine for Mood Tracker Graph
import { BsStars } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // For Sidebar

  return (
    <Box
      as="header"
      py={4}
      px={8}
      bgGradient="linear(to-r, purple.50, pink.50)"
      borderBottom="1px solid"
      borderColor="purple.100"
    >
      <Flex justify="center" align="center" position="relative">
        {/* Sidebar Trigger Button */}
        <Button
          onClick={onOpen}
          leftIcon={<FaBars />}
          colorScheme="purple"
          variant="outline"
          size="md"
          borderColor="purple.500"
          _hover={{
            bgGradient: 'linear(to-r, purple.500, pink.500)',
            color: 'white',
          }}
          position="absolute"
          left="0"
        >
          
        </Button>

        {/* Centered RememberTogether Sign */}
        <Link
          as={RouterLink}
          to="/"
          fontSize="3xl"
          fontWeight="extrabold"
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
          _hover={{ textDecoration: 'none' }}
        >
          RememberTogether
        </Link>
      </Flex>

      {/* Sidebar Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          w="100px" // Set custom width for the sidebar
          maxW="100px" // Ensure the width doesn't exceed this value
        >
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {/* Home Icon */}
              <Tooltip label="Home" placement="right">
                <Button
                  as={RouterLink}
                  to="/"
                  colorScheme="purple"
                  variant="ghost"
                  size="md"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    bgGradient: 'linear(to-r, purple.500, pink.500)',
                    color: 'white',
                  }}
                >
                  <FaHome />
                </Button>
              </Tooltip>

              {/* Mood Tracker Graph Icon */}
              <Tooltip label="Mood Tracker Graph" placement="right">
                <Button
                  as={RouterLink}
                  to="/mood-tracker" // Navigate to the Mood Tracker Graph page
                  colorScheme="purple"
                  variant="ghost"
                  size="md"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    bgGradient: 'linear(to-r, purple.500, pink.500)',
                    color: 'white',
                  }}
                >
                  <FaChartLine /> {/* Mood Tracker Graph Icon */}
                </Button>
              </Tooltip>

              {/* Mood Tracker Icon */}
              <Tooltip label="Mood Tracker" placement="right">
                <Button
                  as={RouterLink}
                  to="/mood-tracker-feature" // Navigate to the Mood Tracker feature
                  colorScheme="purple"
                  variant="ghost"
                  size="md"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    bgGradient: 'linear(to-r, purple.500, pink.500)',
                    color: 'white',
                  }}
                >
                  <FaSmileBeam /> {/* Mood Tracker Icon */}
                </Button>
              </Tooltip>

              {/* Healing Canvas Icon */}
              <Tooltip label="Healing Canvas" placement="right">
                <Button
                  as={RouterLink}
                  to="/healing-canvas"
                  colorScheme="purple"
                  variant="ghost"
                  size="md"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    bgGradient: 'linear(to-r, purple.500, pink.500)',
                    color: 'white',
                  }}
                >
                  <FaPaintBrush />
                </Button>
              </Tooltip>

              {/* My Memories Icon */}
              <Tooltip label="My Memories" placement="right">
                <Button
                  as={RouterLink}
                  to="/my-memories"
                  colorScheme="purple"
                  variant="ghost"
                  size="md"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    bgGradient: 'linear(to-r, purple.500, pink.500)',
                    color: 'white',
                  }}
                >
                  <FaCameraRetro />
                </Button>
              </Tooltip>

              {/* Open Chat Icon */}
              <Tooltip label="Open Chat" placement="right">
                <Button
                  colorScheme="purple"
                  variant="ghost"
                  size="md"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{
                    bgGradient: 'linear(to-r, purple.500, pink.500)',
                    color: 'white',
                  }}
                >
                  <BsStars />
                </Button>
              </Tooltip>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Header;