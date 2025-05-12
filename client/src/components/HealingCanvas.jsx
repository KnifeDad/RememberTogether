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
  FaPaintBrush,
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

// Add custom brush classes
class DottedBrush {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 5;
    this.color = '#000000';
    this.dotSpacing = 10;
    this._points = [];
  }

  onMouseDown(pointer) {
    this._points = [pointer];
  }

  onMouseMove(pointer) {
    this._points.push(pointer);
    this._render();
  }

  onMouseUp() {
    this._points = [];
  }

  _render() {
    const ctx = this.canvas.getContext();
    if (!ctx || !this._points || this._points.length < 2) return;

    ctx.fillStyle = this.color;
    const radius = this.width / 2;

    for (let i = 0; i < this._points.length; i += this.dotSpacing) {
      const point = this._points[i];
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

class WavyBrush {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 5;
    this.color = '#000000';
    this.waveHeight = 10;
    this._points = [];
  }

  onMouseDown(pointer) {
    this._points = [pointer];
  }

  onMouseMove(pointer) {
    this._points.push(pointer);
    this._render();
  }

  onMouseUp() {
    this._points = [];
  }

  _render() {
    const ctx = this.canvas.getContext();
    if (!ctx || !this._points || this._points.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;

    let prev = this._points[0];
    ctx.moveTo(prev.x, prev.y);

    for (let i = 1; i < this._points.length; i++) {
      const curr = this._points[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2 + (i % 2 === 0 ? this.waveHeight : -this.waveHeight);
      ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      prev = curr;
    }
    ctx.stroke();
  }
}

class DashedBrush {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 5;
    this.color = '#000000';
    this.dashLength = 10;
    this.gapLength = 5;
    this._points = [];
  }

  onMouseDown(pointer) {
    this._points = [pointer];
  }

  onMouseMove(pointer) {
    this._points.push(pointer);
    this._render();
  }

  onMouseUp() {
    this._points = [];
  }

  _render() {
    const ctx = this.canvas.getContext();
    if (!ctx || !this._points || this._points.length < 2) return;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;

    let distance = 0;
    let drawing = true;
    let start = this._points[0];

    for (let i = 1; i < this._points.length; i++) {
      const end = this._points[i];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const segmentLength = Math.sqrt(dx * dx + dy * dy);
      if (drawing) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
      distance += segmentLength;
      if (drawing && distance >= this.dashLength) {
        drawing = false;
        distance = 0;
      } else if (!drawing && distance >= this.gapLength) {
        drawing = true;
        distance = 0;
      }
      start = end;
    }
  }
}

// Add brush textures
const brushTextures = [
  {
    name: 'Smooth',
    brush: class SmoothBrush {
      constructor(canvas) {
        this.canvas = canvas;
        this.width = 5;
        this.color = '#000000';
        this._points = [];
      }

      onMouseDown(pointer) {
        this._points = [pointer];
      }

      onMouseMove(pointer) {
        this._points.push(pointer);
        this._render();
      }

      onMouseUp() {
        this._points = [];
      }

      _render() {
        const ctx = this.canvas.getContext();
        if (!ctx || !this._points || this._points.length < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        let prev = this._points[0];
        ctx.moveTo(prev.x, prev.y);

        for (let i = 1; i < this._points.length; i++) {
          const curr = this._points[i];
          ctx.lineTo(curr.x, curr.y);
          prev = curr;
        }
        ctx.stroke();
      }
    },
    icon: 'FaPencilAlt',
  },
  {
    name: 'Dotted',
    brush: DottedBrush,
    icon: 'FaPencilAlt',
  },
  {
    name: 'Wavy',
    brush: WavyBrush,
    icon: 'FaPencilAlt',
  },
  {
    name: 'Dashed',
    brush: DashedBrush,
    icon: 'FaPencilAlt',
  },
];

const HealingCanvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [currentTool, setCurrentTool] = useState('paintbrush');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(20);
  const [showBreathing, setShowBreathing] = useState(false);
  const removedObjectsRef = useRef([]);
  const toast = useToast();
  const [selectedTexture, setSelectedTexture] = useState('Smooth');

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: Math.max(window.innerWidth - 40, 800),
      height: Math.max(window.innerHeight - 100, 600),
      backgroundColor: '#ffffff',
      isDrawingMode: false,
      preserveObjectStacking: true,
    });

    // Add path:created event to ensure paths are preserved
    canvas.on('path:created', function (e) {
      const path = e.path;
      path.set({
        selectable: true,
        evented: true,
        stroke: selectedColor,
        strokeWidth: brushSize,
      });
    });

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

  // Update brush when size or color changes
  useEffect(() => {
    if (!canvas) return;

    // Remove all existing event listeners
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.off('path:created');

    if (currentTool === 'pencil' || currentTool === 'paintbrush') {
      canvas.isDrawingMode = true;
      const brush = new PencilBrush(canvas);
      brush.width = brushSize;
      brush.color = selectedColor;
      canvas.freeDrawingBrush = brush;

      // Add path:created event handler
      canvas.on('path:created', (e) => {
        const path = e.path;
        path.set({
          selectable: true,
          evented: true,
          stroke: selectedColor,
          strokeWidth: brushSize,
        });
      });
    } else if (currentTool === 'eraser') {
      canvas.isDrawingMode = true;
      const brush = new PencilBrush(canvas);
      brush.width = brushSize;
      brush.color = '#ffffff';
      canvas.freeDrawingBrush = brush;

      // Add path:created event handler for eraser
      canvas.on('path:created', (e) => {
        const path = e.path;
        path.set({
          selectable: false,
          evented: false,
          stroke: '#ffffff',
          strokeWidth: brushSize,
        });
      });
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
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
      });
    } else if (currentTool === 'line') {
      canvas.isDrawingMode = false;
      let startPoint;
      let line;
      canvas.on('mouse:down', (options) => {
        startPoint = canvas.getPointer(options.e);
        line = new Line([startPoint.x, startPoint.y, startPoint.x, startPoint.y], {
          stroke: selectedColor,
          strokeWidth: brushSize,
        });
        canvas.add(line);
      });
      canvas.on('mouse:move', (options) => {
        if (!line) return;
        const pointer = canvas.getPointer(options.e);
        line.set({
          x2: pointer.x,
          y2: pointer.y,
        });
        canvas.requestRenderAll();
      });
      canvas.on('mouse:up', () => {
        line = null;
      });
    } else if (currentTool === 'circle') {
      canvas.isDrawingMode = false;
      let startPoint;
      let circle;
      canvas.on('mouse:down', (options) => {
        startPoint = canvas.getPointer(options.e);
        circle = new Circle({
          left: startPoint.x,
          top: startPoint.y,
          radius: 0,
          stroke: selectedColor,
          strokeWidth: brushSize,
          fill: 'transparent',
        });
        canvas.add(circle);
      });
      canvas.on('mouse:move', (options) => {
        if (!circle) return;
        const pointer = canvas.getPointer(options.e);
        const radius = Math.sqrt(
          Math.pow(pointer.x - startPoint.x, 2) + Math.pow(pointer.y - startPoint.y, 2)
        );
        circle.set({
          radius: radius,
        });
        canvas.requestRenderAll();
      });
      canvas.on('mouse:up', () => {
        circle = null;
      });
    } else if (currentTool === 'rectangle') {
      canvas.isDrawingMode = false;
      let startPoint;
      let rect;
      canvas.on('mouse:down', (options) => {
        startPoint = canvas.getPointer(options.e);
        rect = new Rect({
          left: startPoint.x,
          top: startPoint.y,
          width: 0,
          height: 0,
          stroke: selectedColor,
          strokeWidth: brushSize,
          fill: 'transparent',
        });
        canvas.add(rect);
      });
      canvas.on('mouse:move', (options) => {
        if (!rect) return;
        const pointer = canvas.getPointer(options.e);
        rect.set({
          width: pointer.x - startPoint.x,
          height: pointer.y - startPoint.y,
        });
        canvas.requestRenderAll();
      });
      canvas.on('mouse:up', () => {
        rect = null;
      });
    } else {
      canvas.isDrawingMode = false;
      canvas.freeDrawingBrush = null;
    }

    canvas.requestRenderAll();
  }, [canvas, brushSize, selectedColor, currentTool]);

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

  // Add texture selection handler
  const handleTextureSelect = (texture) => {
    setSelectedTexture(texture);
    if (currentTool === 'pencil' && canvas) {
      canvas.isDrawingMode = true;
      const brush = new PencilBrush(canvas);
      brush.width = brushSize;
      brush.color = selectedColor;
      canvas.freeDrawingBrush = brush;
      canvas.requestRenderAll();
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
    if (!canvas || !showGrid) return;

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

    if (showGrid) {
      canvas.on('after:render', drawGrid);
      canvas.requestRenderAll();
    }

    return () => {
      canvas.off('after:render', drawGrid);
    };
  }, [canvas, showGrid, gridSize]);

  return (
    <Box p={4}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        p={2}
        borderRadius="md"
        boxShadow="sm"
        mb={4}
        wrap="wrap"
        gap={2}
      >
        <HStack spacing={2}>
          <IconButton
            icon={<FaPaintBrush />}
            onClick={() => handleToolSelect('paintbrush')}
            colorScheme={currentTool === 'paintbrush' ? 'blue' : 'gray'}
            aria-label="Paintbrush"
          />
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
            onClick={() => setShowGrid(!showGrid)}
            colorScheme={showGrid ? 'blue' : 'gray'}
          />
          <IconButton
            icon={<FaLungs />}
            onClick={() => setShowBreathing(!showBreathing)}
            colorScheme={showBreathing ? 'blue' : 'gray'}
          />
          <IconButton icon={<FaUndo />} onClick={handleUndo} colorScheme="gray" aria-label="Undo" />
          <IconButton icon={<FaRedo />} onClick={handleRedo} colorScheme="gray" aria-label="Redo" />
        </HStack>

        <HStack spacing={4} ml={4}>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                leftIcon={<FaPencilAlt />}
                colorScheme={currentTool === 'pencil' ? 'blue' : 'gray'}
                variant="outline"
              >
                {selectedTexture}
              </Button>
            </PopoverTrigger>
            <PopoverContent width="200px">
              <PopoverBody>
                <Text mb={2} fontWeight="bold">
                  Brush Texture
                </Text>
                <SimpleGrid columns={2} spacing={2}>
                  {brushTextures.map((texture) => (
                    <Button
                      key={texture.name}
                      size="sm"
                      onClick={() => handleTextureSelect(texture.name)}
                      colorScheme={selectedTexture === texture.name ? 'blue' : 'gray'}
                      variant="outline"
                    >
                      {texture.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Box w="200px">
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
              <PopoverBody p={4}>
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

        <HStack spacing={2} ml="auto">
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
      >
        <canvas ref={canvasRef} />
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
