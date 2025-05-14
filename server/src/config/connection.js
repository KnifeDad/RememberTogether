import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/remember-together', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Log any errors that occur after initial connection
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Log when the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
});

// Log when the connection is reconnected
mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

export default mongoose.connection;
