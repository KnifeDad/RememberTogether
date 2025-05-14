import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video', 'audio'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: String,
  duration: Number, // for video/audio
  size: Number,
  mimeType: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const memorySchema = new mongoose.Schema({
  content: String,
  media: [mediaSchema],
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: {
    type: String,
    enum: ['Family', 'Travel', 'Work', 'Personal', 'Health', 'Education', 'Hobbies'],
    default: 'Personal',
    required: false
  },
  reminder: {
    enabled: { type: Boolean, default: false },
    date: { type: Date },
    type: {
      type: String,
      enum: ['one-time', 'yearly', 'monthly', 'weekly'],
      default: 'one-time'
    },
    lastNotified: { type: Date }
  }
});

export default mongoose.model('Memory', memorySchema);

