/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import {
  Box,
  Flex,
  Input,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { UPLOAD_AUDIO } from '../utils/mutation'; // Import the mutation
import ReactMarkdown from 'react-markdown';
import { GET_TEXT_RESPONSE } from '../utils/mutation'; // Import the mutation for text response
export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [uploadAudio] = useMutation(UPLOAD_AUDIO); // Use the mutation here
  const [getTextResponse] = useMutation(GET_TEXT_RESPONSE);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const { data } = await getTextResponse({ variables: { text: input } });
      const botMessage = { text: data.generateTextResponse, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Text response error:', error);
      setMessages((prev) => [...prev, { text: 'Failed to get response.', sender: 'bot' }]);
    }
  };

  const handleRecord = async () => {
    if (!recording) {
      // Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await sendAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } else {
      // Stop recording
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudio = async (audioBlob) => {
    const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
    console.log('Blob type:', audioBlob.type);
    try {
      // Perform the audio file upload and transcription
      const { data } = await uploadAudio({ variables: { audio: file } });
      const { transcript, supportiveResponse } = data.transcribeAudio;
      console.log({ transcript, supportiveResponse });
      // First show user's message
      const userMessage = {
        text: transcript,
        sender: 'user',
      };

      // Then bot response
      const botMessage = {
        text: supportiveResponse,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);
    } catch (error) {
      console.error('Upload error:', error);
      setMessages((prev) => [...prev, { text: 'Failed to transcribe audio.', sender: 'bot' }]);
    }
  };

  const fetchToneAnalysis = async (transcription) => {
    try {
      const response = await fetch('/api/tone-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcription }),
      });
      const data = await response.json();
      return data.supportiveResponse || 'Could not analyze tone.';
    } catch (error) {
      console.error('Tone analysis error:', error);
      return 'Error analyzing tone.';
    }
  };

  return (
    <Flex direction="column" maxW="600px" mx="auto" p={4} h="90vh">
      <Box
        flex="1"
        p={4}
        overflowY="auto"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        borderRadius="lg"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <VStack spacing={3} align="stretch">
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
              bg={
                msg.sender === 'bot' && msg.escalation
                  ? 'red.100'
                  : msg.sender === 'bot'
                    ? 'gray.100'
                    : 'blue.100'
              }
              borderLeft={msg.sender === 'bot' && msg.escalation ? '4px solid red' : undefined}
              borderRadius="md"
              p={3}
              maxW="70%"
              shadow="sm"
            >
              {msg.sender === 'bot' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                <Text fontSize="sm">{msg.text}</Text>
              )}
              {msg.tone !== undefined && (
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Tone score: {msg.tone.toFixed(2)}
                </Text>
              )}
              {msg.escalation && (
                <Text fontSize="xs" fontWeight="bold" color="red.600">
                  May need professional support.
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

      <HStack mt={4}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or record..."
          bg="white"
          borderColor="gray.200"
        />
        <IconButton
          aria-label="Send message"
          icon={<FaPaperPlane />}
          onClick={handleSend}
          colorScheme="blue"
        />
        <IconButton
          aria-label="Record voice"
          icon={<FaMicrophone />}
          onClick={handleRecord}
          colorScheme={recording ? 'red' : 'gray'}
        />
      </HStack>
    </Flex>
  );
}
