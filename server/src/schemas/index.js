const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return context.user;
      }
      throw new Error('Not authenticated');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      // TODO: Implement login logic
      throw new Error('Not implemented');
    },
    addUser: async (parent, { username, email, password }) => {
      // TODO: Implement user creation logic
      throw new Error('Not implemented');
    },
  },
};

module.exports = { typeDefs, resolvers }; 