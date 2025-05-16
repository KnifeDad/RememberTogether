import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const DedicationModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={useColorModeValue('white', 'gray.800')} p={6}>
        <ModalHeader
          fontSize="2xl"
          textAlign="center"
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
        >
          In Loving Memory
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
              This project is dedicated to Guy Ricketts&apos; wife, Kristyn Ricketts, who lost her
              courageous battle with Stage 4 breast cancer. Her strength, grace, and love continue
              to inspire us every day. The AI assistant in our application is named in her honor,
              carrying forward her spirit of compassion and understanding.
            </Text>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
              In memory of Khair Muhammad, loving uncle to Muhsina Shinwari and in memory of Mr.
              Lowery, loving father to Maurice Lowery.
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DedicationModal;
