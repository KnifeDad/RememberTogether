/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { GraphQLUpload } from 'graphql-upload';
import { SpeechClient } from '@google-cloud/speech';
import User from '../models/User.js';
import Mood from '../models/Mood.js'; // Import Mood model
import Memory from '../models/memory.js'; // Import Memory model
import { signToken } from '../utils/auth.js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const speechClient = new SpeechClient({
  keyFilename: path.join(process.cwd(), 'google-services.json'),
});

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getSingleUser: async (_parent, { id, username }) => {
      const foundUser = await User.findOne({
        $or: [{ _id: id }, { username }],
      });

      if (!foundUser) {
        throw new Error('Cannot find a user with this id!');
      }

      return foundUser;
    },

    getMe: async (_parent, _args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('memories');
      }

      throw new Error('You need to be logged in!');
    },

  
    getMyMoods: async (_, __, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return await Mood.find({ user: context.user._id }).sort({ createdAt: -1 });
    },
  },

  Mutation: {
    createUser: async (_parent, { input }) => {
      const user = await User.create(input);
      if (!user) throw new Error('Something is wrong!');

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user) throw new Error("Can't find this user");

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new Error('Wrong password!');

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    generateTextResponse: async (_parent, { text }) => {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                `You are a helpful, creative AI assistant. Based on the user's message, respond in an emotionally supportive, poetic, or thoughtful way. Offer encouragement or help them express themselves.`,
            },
            {
              role: 'user',
              content: text,
            },
          ],
        });

        const reply = completion.choices[0].message.content;
        console.log('Generated text response:', reply);
        return reply;
      } catch (error) {
        console.error('OpenAI error (text response):', error);
        return 'Sorry, I had trouble generating a response.';
      }
    },

    transcribeAudio: async (_parent, { audio }) => {
      const { createReadStream, filename } = await audio;
      const stream = createReadStream();

      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

      const filePath = path.join(uploadsDir, filename);

      await new Promise((resolve, reject) => {
        const out = fs.createWriteStream(filePath);
        stream.pipe(out);
        out.on('finish', resolve);
        out.on('error', reject);
      });

      const stats = fs.statSync(filePath);
      console.log(`Saved file size: ${stats.size} bytes`);

      if (stats.size < 1000) {
        fs.unlinkSync(filePath);
        throw new Error('Uploaded file seems too small or empty.');
      }

      const audioBytes = fs.readFileSync(filePath).toString('base64');

      const request = {
        audio: { content: audioBytes },
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: 'en-US',
        },
      };

      const [response] = await speechClient.recognize(request);
      fs.unlinkSync(filePath);

      const transcript = response.results.map(r => r.alternatives[0].transcript).join('\n');


      console.log('Transcript:', transcript);

      if (!transcript) {
        return {
          transcript: '',
          supportiveResponse: 'Could not transcribe audio.',
        };
      }

      try {
        const toneAnalysis = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a supportive AI companion that helps users express themselves. Based on the user's spoken message, you may provide emotional support, or help them write a short poem, story, or thoughtful reflection if appropriate. Always respond directly to the user as a friendly, empathetic voice.`,

            },
            {
              role: 'user',
              content: `Here is my message: "${transcript}". Please respond helpfully and creatively.`,
            },
          ],
        });

        const supportiveResponse = toneAnalysis.choices[0].message.content;
        console.log('Tone Analysis & Support:', supportiveResponse);

        return { transcript, supportiveResponse };
      } catch (error) {
        console.error('Error in OpenAI tone analysis:', error);
        return { transcript, supportiveResponse: 'Could not analyze tone.' };
      }
    },

  
   saveMood: async (_, { input }, context) => {
      if (!context.user) throw new Error('Not authenticated');

      const newMood = await Mood.create({
        ...input,
        user: context.user._id,
      });

      return newMood;
    },
  

    addMemory: async (_parent, { content, imageUrl }, context) => {
      if (context.user) {
        const memory = await Memory.create({
          content,
          imageUrl,
          createdAt: new Date().toISOString(),
          user: context.user._id,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { memories: memory._id } },
          { new: true }
        );

        return memory;
      }

      throw new Error('You need to be logged in!');
    },

    deleteMemory: async (_parent, { id }, context) => {
      if (context.user) {
        const memory = await Memory.findOneAndDelete({
          _id: id,
          user: context.user._id,
        });

        if (!memory) throw new Error('No memory found with this id!');
        return true;
      }

      throw new Error('You need to be logged in!');
    },
  },
};

export default resolvers;

