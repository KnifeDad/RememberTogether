const Mood = require('../models/Mood');

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving moods', error });
  }
};

exports.addMood = async (req, res) => {
  const { mood, description } = req.body;
  const newMood = new Mood({ mood, description });

  try {
    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (error) {
    res.status(400).json({ message: 'Error adding mood', error });
  }
};

exports.updateMood = async (req, res) => {
  const { id } = req.params;
  const { mood, description } = req.body;

  try {
    const updatedMood = await Mood.findByIdAndUpdate(id, { mood, description }, { new: true });
    if (!updatedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    res.status(200).json(updatedMood);
  } catch (error) {
    res.status(400).json({ message: 'Error updating mood', error });
  }
};

exports.deleteMood = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMood = await Mood.findByIdAndDelete(id);
    if (!deletedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    res.status(200).json({ message: 'Mood deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mood', error });
  }
};
