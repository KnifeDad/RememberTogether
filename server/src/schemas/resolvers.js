import User from '../models/User.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
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
        return await User.findById(context.user._id);
      }
      throw new Error('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (_parent, { input }) => {
      const user = await User.create(input);

      if (!user) {
        throw new Error('Something is wrong!');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
  },
};

export default resolvers;
