import mongoose from 'mongoose';



const memorySchema = new mongoose.Schema({

  content: String,

  imageUrl: String,

  createdAt: { type: Date, default: Date.now },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});



export default mongoose.model('Memory', memorySchema);

