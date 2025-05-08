const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memoryController');

// Route to get all memories
router.get('/', memoryController.getAllMemories);

// Route to create a new memory
router.post('/', memoryController.createMemory);

// Route to get a specific memory by ID
router.get('/:id', memoryController.getMemoryById);

// Route to update a memory by ID
router.put('/:id', memoryController.updateMemory);

// Route to delete a memory by ID
router.delete('/:id', memoryController.deleteMemory);

module.exports = router;
