const Memory = require('../models/Memory');

// Get all memories
exports.getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving memories', error });
  }
};

// Create a new memory
exports.createMemory = async (req, res) => {
  const newMemory = new Memory(req.body);
  try {
    const savedMemory = await newMemory.save();
    res.status(201).json(savedMemory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating memory', error });
  }
};

// Update a memory
exports.updateMemory = async (req, res) => {
  try {
    const updatedMemory = await Memory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMemory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating memory', error });
  }
};

// Delete a memory
exports.deleteMemory = async (req, res) => {
  try {
    await Memory.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting memory', error });
  }
};
