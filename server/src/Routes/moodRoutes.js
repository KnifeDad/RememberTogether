const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodcontroller');

// Route to get all mood entries
router.get('/', moodController.getAllMoods);

// Route to add a new mood entry
router.post('/', moodController.addMood);

// Route to update a mood entry by ID
router.put('/:id', moodController.updateMood);

// Route to delete a mood entry by ID
router.delete('/:id', moodController.deleteMood);

module.exports = router;
