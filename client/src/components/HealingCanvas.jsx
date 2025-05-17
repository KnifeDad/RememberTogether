import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  SimpleGrid,
  Tooltip,
  Button,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  FaPencilAlt,
  FaEraser,
  FaFont,
  FaCircle,
  FaSquare,
  FaUndo,
  FaRedo,
  FaPalette,
  FaTh,
  FaMinus,
  FaSave,
  FaFolderOpen,
  FaLungs,
} from 'react-icons/fa';
import { Canvas, IText, Circle, Rect, PencilBrush, Line, PatternBrush, Path, Group } from 'fabric';

const emotionColors = [
  {
    color: '#FF6B6B',
    emotion: 'Passion & Energy',
    description: 'Express your inner fire and motivation',
  },
  {
    color: '#4ECDC4',
    emotion: 'Calm & Peace',
    description: 'Find your center and tranquility',
  },
  {
    color: '#FFE66D',
    emotion: 'Joy & Hope',
    description: 'Celebrate moments of happiness and optimism',
  },
  {
    color: '#6B5B95',
    emotion: 'Wisdom & Intuition',
    description: 'Connect with your inner wisdom',
  },
  {
    color: '#F7CAC9',
    emotion: 'Compassion & Love',
    description: 'Express care and tenderness',
  },
  {
    color: '#92A8D1',
    emotion: 'Trust & Security',
    description: 'Feel safe and protected',
  },
  {
    color: '#88B04B',
    emotion: 'Growth & Renewal',
    description: 'Represent personal development and change',
  },
  {
    color: '#955251',
    emotion: 'Strength & Grounding',
    description: 'Feel rooted and powerful',
  },
  {
    color: '#B565A7',
    emotion: 'Creativity & Spirituality',
    description: 'Connect with your creative spirit',
  },
  {
    color: '#009B77',
    emotion: 'Healing & Balance',
    description: 'Find harmony and restoration',
  },
];

const HealingCanvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [currentTool, setCurrentTool] = useState('pencil');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(20);
  const [showBreathing, setShowBreathing] = useState(false);
  const removedObjectsRef = useRef([]);
  const toast = useToast();

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: Math.max(window.innerWidth - 40, 800),
      height: Math.max(window.innerHeight - 100, 600),
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    // Set up event listeners
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    setCanvas(canvas);

    // Handle window resize
    const handleResize = () => {
      canvas.setDimensions({
        width: Math.max(window.innerWidth - 40, 800),
        height: Math.max(window.innerHeight - 100, 600),
      });
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);

  // Update canvas when tool changes
  useEffect(() => {
    if (!canvas) return;

    // Remove all event listeners
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.off('path:created');

    if (currentTool === 'pencil') {
      canvas.isDrawingMode = true;
      const brush = new PencilBrush(canvas);
      brush.width = brushSize;
      brush.color = selectedColor;
      canvas.freeDrawingBrush = brush;
      canvas.requestRenderAll();
    } else if (currentTool === 'eraser') {
      canvas.isDrawingMode = true;
      const brush = new PencilBrush(canvas);
      brush.width = brushSize;
      brush.color = '#ffffff';
      canvas.freeDrawingBrush = brush;
      canvas.requestRenderAll();
    } else if (currentTool === 'text') {
      canvas.isDrawingMode = false;
      canvas.on('mouse:down', (options) => {
        const pointer = canvas.getPointer(options.e);
        const text = new IText('', {
          left: pointer.x,
          top: pointer.y,
          fontFamily: 'Arial',
          fontSize: 20,
          fill: selectedColor,
          selectable: true,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
      });
    } else {
      canvas.isDrawingMode = false;
      // Add back shape handlers
      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:up', handleMouseUp);
    }
  }, [canvas, currentTool, brushSize, selectedColor]);

  const saveDrawing = () => {
    if (!canvas) return;
    try {
      // Save the current drawing state
      const drawingData = canvas.toJSON([
        'selectable',
        'evented',
        'lockMovementX',
        'lockMovementY',
        'lockRotation',
        'lockScalingX',
        'lockScalingY',
        'hasControls',
        'hasBorders',
        'transparentCorners',
        'cornerColor',
        'cornerSize',
        'padding',
      ]);
      localStorage.setItem('healingCanvasDrawing', JSON.stringify(drawingData));
      toast({
        title: 'Drawing saved',
        description: "Your drawing has been saved to your browser's local storage",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving drawing:', error);
      toast({
        title: 'Error saving drawing',
        description: 'There was a problem saving your drawing. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const loadDrawing = () => {
    if (!canvas) return;
    try {
      const savedDrawing = localStorage.getItem('healingCanvasDrawing');
      if (savedDrawing) {
        canvas.loadFromJSON(JSON.parse(savedDrawing), () => {
          // Reinitialize the canvas state
          canvas.isDrawingMode = currentTool === 'pencil' || currentTool === 'eraser';
          // Restore object properties
          canvas.getObjects().forEach((obj) => {
            if (obj.type !== 'group') {
              obj.selectable = true;
              obj.evented = true;
              obj.lockMovementX = false;
              obj.lockMovementY = false;
              obj.lockRotation = false;
              obj.lockScalingX = false;
              obj.lockScalingY = false;
              obj.hasControls = true;
              obj.hasBorders = true;
              obj.transparentCorners = false;
              obj.cornerColor = 'rgba(102,153,255,0.8)';
              obj.cornerSize = 12;
              obj.padding = 5;
            }
          });
          // Reinitialize the brush
          if (currentTool === 'pencil') {
            const brush = new PencilBrush(canvas);
            brush.width = brushSize;
            brush.color = selectedColor;
            canvas.freeDrawingBrush = brush;
          } else if (currentTool === 'eraser') {
            canvas.isDrawingMode = true;
          }
          // Force a render
          canvas.requestRenderAll();
          toast({
            title: 'Drawing loaded',
            description: 'Your previous drawing has been restored from local storage',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
      } else {
        toast({
          title: 'No saved drawing',
          description: "There is no saved drawing in your browser's local storage",
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error loading drawing:', error);
      toast({
        title: 'Error loading drawing',
        description: 'There was a problem loading your drawing. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Add undo/redo functionality
  const handleUndo = () => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    if (objects.length > 0) {
      const lastObject = objects[objects.length - 1];
      removedObjectsRef.current.push(lastObject);
      canvas.remove(lastObject);
      canvas.requestRenderAll();
    }
  };

  const handleRedo = () => {
    if (!canvas || removedObjectsRef.current.length === 0) return;
    const lastRemoved = removedObjectsRef.current.pop();
    canvas.add(lastRemoved);
    canvas.requestRenderAll();
  };

  // Add path:created event to ensure paths are preserved
  useEffect(() => {
    if (!canvas) return;
    const handlePathCreated = (e) => {
      const path = e.path;
      path.set({
        selectable: true,
        evented: true,
        stroke: selectedColor,
        strokeWidth: brushSize,
      });
      canvas.requestRenderAll();
    };

    canvas.on('path:created', handlePathCreated);

    return () => {
      canvas.off('path:created', handlePathCreated);
    };
  }, [canvas, selectedColor, brushSize]);

  // Add canvas modification observer
  useEffect(() => {
    if (!canvas) return;

    const handleObjectModified = (e) => {
      console.log('Object modified:', e.target);
    };

    const handleObjectRemoved = (e) => {
      console.log('Object removed:', e.target);
      console.log('Remaining objects:', canvas.getObjects().length);
    };

    canvas.on('object:modified', handleObjectModified);
    canvas.on('object:removed', handleObjectRemoved);

    return () => {
      canvas.off('object:modified', handleObjectModified);
      canvas.off('object:removed', handleObjectRemoved);
    };
  }, [canvas]);

  const handleToolSelect = (tool) => {
    if (!canvas) return;
    setCurrentTool(tool);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  // Add grid functionality
  useEffect(() => {
    if (!canvas) return;

    const drawGrid = () => {
      const ctx = canvas.getContext();
      const width = canvas.width;
      const height = canvas.height;

      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      for (let i = 0; i < height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    };

    // Remove any existing grid event listener
    canvas.off('after:render', drawGrid);

    // Add grid event listener only if grid is enabled
    if (showGrid) {
      canvas.on('after:render', drawGrid);
      canvas.requestRenderAll();
    }

    return () => {
      canvas.off('after:render', drawGrid);
    };
  }, [canvas, showGrid, gridSize]);

  // Add grid toggle handler
  const handleGridToggle = () => {
    setShowGrid(!showGrid);
    if (canvas) {
      canvas.requestRenderAll();
    }
  };

  // Add shape creation handlers
  const handleMouseDown = (e) => {
    if (!canvas) return;

    const pointer = canvas.getPointer(e.e);
    const x = pointer.x;
    const y = pointer.y;

    if (currentTool === 'circle') {
      const circle = new Circle({
        left: x,
        top: y,
        radius: 0,
        fill: 'transparent',
        stroke: selectedColor,
        strokeWidth: brushSize,
        selectable: true,
        originX: 'center',
        originY: 'center',
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
    } else if (currentTool === 'rectangle') {
      const rect = new Rect({
        left: x,
        top: y,
        width: 0,
        height: 0,
        fill: 'transparent',
        stroke: selectedColor,
        strokeWidth: brushSize,
        selectable: true,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
    } else if (currentTool === 'line') {
      const line = new Line([x, y, x, y], {
        stroke: selectedColor,
        strokeWidth: brushSize,
        selectable: true,
      });
      canvas.add(line);
      canvas.setActiveObject(line);
    }
  };

  const handleMouseMove = (e) => {
    if (!canvas) return;

    const pointer = canvas.getPointer(e.e);
    const x = pointer.x;
    const y = pointer.y;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    if (currentTool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(x - activeObject.left, 2) + Math.pow(y - activeObject.top, 2)
      );
      activeObject.set('radius', radius);
    } else if (currentTool === 'rectangle') {
      const width = x - activeObject.left;
      const height = y - activeObject.top;
      activeObject.set({
        width: Math.abs(width),
        height: Math.abs(height),
        left: width < 0 ? x : activeObject.left,
        top: height < 0 ? y : activeObject.top,
      });
    } else if (currentTool === 'line') {
      activeObject.set({
        x2: x,
        y2: y,
      });
    }
    canvas.requestRenderAll();
  };

  const handleMouseUp = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      // Ensure the object is properly rendered
      canvas.requestRenderAll();
      // Deselect the object after creation
      canvas.discardActiveObject();
    }
  };

  return (
    <Box p={4}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        p={2}
        borderRadius="md"
        boxShadow="sm"
        mb={4}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        align={{ base: 'stretch', md: 'center' }}
      >
        <HStack spacing={2} wrap="wrap" w={{ base: 'full', md: 'auto' }}>
          <IconButton
            icon={<FaPencilAlt />}
            onClick={() => handleToolSelect('pencil')}
            colorScheme={currentTool === 'pencil' ? 'blue' : 'gray'}
            aria-label="Pencil"
          />
          <IconButton
            icon={<FaEraser />}
            onClick={() => handleToolSelect('eraser')}
            colorScheme={currentTool === 'eraser' ? 'blue' : 'gray'}
          />
          <IconButton
            icon={<FaFont />}
            onClick={() => handleToolSelect('text')}
            colorScheme={currentTool === 'text' ? 'blue' : 'gray'}
          />
          <IconButton
            icon={<FaMinus />}
            onClick={() => handleToolSelect('line')}
            colorScheme={currentTool === 'line' ? 'blue' : 'gray'}
          />
          <IconButton
            icon={<FaCircle />}
            onClick={() => handleToolSelect('circle')}
            colorScheme={currentTool === 'circle' ? 'blue' : 'gray'}
          />
          <IconButton
            icon={<FaSquare />}
            onClick={() => handleToolSelect('rectangle')}
            colorScheme={currentTool === 'rectangle' ? 'blue' : 'gray'}
          />
          <IconButton
            icon={<FaTh />}
            onClick={handleGridToggle}
            colorScheme={showGrid ? 'blue' : 'gray'}
            aria-label="Toggle grid"
          />
          <IconButton
            icon={<FaLungs />}
            onClick={() => setShowBreathing(!showBreathing)}
            colorScheme={showBreathing ? 'blue' : 'gray'}
          />
          <IconButton icon={<FaUndo />} onClick={handleUndo} colorScheme="gray" aria-label="Undo" />
          <IconButton icon={<FaRedo />} onClick={handleRedo} colorScheme="gray" aria-label="Redo" />
        </HStack>

        <HStack spacing={4} ml={{ base: 0, md: 4 }} w={{ base: 'full', md: 'auto' }}>
          <Box w={{ base: 'full', md: '200px' }}>
            <Text mb={2}>Brush Size: {brushSize}</Text>
            <Slider value={brushSize} onChange={setBrushSize} min={1} max={50} step={1}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Popover placement="bottom">
            <PopoverTrigger>
              <IconButton
                icon={<FaPalette />}
                colorScheme="blue"
                variant="outline"
                _hover={{ bg: selectedColor, color: 'white' }}
                bg={selectedColor}
                color="white"
              />
            </PopoverTrigger>
            <PopoverContent width="300px">
              <PopoverBody>
                <Text mb={2} fontWeight="bold">
                  Emotion Colors
                </Text>
                <SimpleGrid columns={5} spacing={2}>
                  {emotionColors.map(({ color, emotion, description }) => (
                    <Tooltip
                      key={color}
                      label={`${emotion}: ${description}`}
                      placement="top"
                      hasArrow
                    >
                      <Box
                        w="40px"
                        h="40px"
                        bg={color}
                        borderRadius="md"
                        cursor="pointer"
                        onClick={() => setSelectedColor(color)}
                        _hover={{ transform: 'scale(1.1)' }}
                        transition="transform 0.2s"
                      />
                    </Tooltip>
                  ))}
                </SimpleGrid>
                <Text mt={4} mb={2} fontWeight="bold">
                  Custom Color
                </Text>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>

        <HStack spacing={2} ml={{ base: 0, md: 'auto' }} w={{ base: 'full', md: 'auto' }}>
          <IconButton
            icon={<FaSave />}
            onClick={saveDrawing}
            colorScheme="green"
            aria-label="Save drawing"
          />
          <IconButton
            icon={<FaFolderOpen />}
            onClick={loadDrawing}
            colorScheme="blue"
            aria-label="Load drawing"
          />
        </HStack>
      </Flex>

      <Box
        position="relative"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        borderRadius="md"
        overflow="hidden"
        width="100%"
        height={{ base: 'calc(100vh - 300px)', md: 'calc(100vh - 200px)' }}
        minHeight="600px"
        bg="white"
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        {showBreathing && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="200px"
            height="200px"
            borderRadius="50%"
            border="4px solid"
            borderColor="blue.400"
            animation="breathing 4s infinite ease-in-out"
            opacity="0.8"
            pointerEvents="none"
            boxShadow="0 0 20px rgba(66, 153, 225, 0.5)"
            sx={{
              '@keyframes breathing': {
                '0%': {
                  transform: 'translate(-50%, -50%) scale(0.8)',
                  opacity: 0.6,
                  borderColor: 'blue.300',
                },
                '50%': {
                  transform: 'translate(-50%, -50%) scale(1.2)',
                  opacity: 0.9,
                  borderColor: 'blue.500',
                },
                '100%': {
                  transform: 'translate(-50%, -50%) scale(0.8)',
                  opacity: 0.6,
                  borderColor: 'blue.300',
                },
              },
            }}
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
              color="blue.600"
              fontWeight="bold"
              pointerEvents="none"
              opacity="0.9"
            >
              Breathe
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HealingCanvas;
