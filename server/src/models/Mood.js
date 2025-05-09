import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'neutral', 'angry', 'anxious', 'excited', 'calm'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  },
});

const Mood = mongoose.model('Mood', moodSchema);

export default Mood; // Use ES Module export
