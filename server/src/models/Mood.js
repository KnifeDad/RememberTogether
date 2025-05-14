import { Schema, model } from 'mongoose';

const categorySchema = new Schema({

  question1: String,

  question2: String,

});



const moodSchema = new Schema({

  health: categorySchema,

  work: categorySchema,

  social: categorySchema,

  emotional: categorySchema,

  chores: categorySchema,

  user: {

    type: Schema.Types.ObjectId,

    ref: 'User',

    required: true,

  },

  createdAt: {

    type: Date,

    default: Date.now,

  },

});



export default model('Mood', moodSchema);

