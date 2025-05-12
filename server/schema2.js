// ================= BACKEND FILES =================

// ======= graphql/typeDefs.js =======
const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Group {
    id: ID!
    name: String!
    description: String
    createdBy: User
    members: [User]
  }

  type Query {
    groups(search: String): [Group]
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    createGroup(name: String!, description: String, createdBy: ID!): Group
    addUserToGroup(groupId: ID!, userId: ID!): Group
  }
`;


// ======= graphql/resolvers.js =======
const User = require('../models/User');
const Group = require('../models/Group');

module.exports = {
  Query: {
    groups: async (_, { search }) => {
      const query = search ? { name: new RegExp(search, 'i') } : {};
      return Group.find(query).populate('createdBy').populate('members');
    }
  },

  Mutation: {
    createUser: async (_, { username, email }) => {
      return await new User({ username, email }).save();
    },

    createGroup: async (_, { name, description, createdBy }) => {
      return await new Group({
        name,
        description,
        createdBy,
        members: [createdBy]
      }).save();
    },

    addUserToGroup: async (_, { groupId, userId }) => {
      const group = await Group.findById(groupId);
      if (!group.members.includes(userId)) {
        group.members.push(userId);
        await group.save();
      }
      return group.populate('createdBy').populate('members');
    }
  }
};


// ================= FRONTEND FILES =================

// ======= graphql/queries.js =======
import { gql } from '@apollo/client';

export const GET_GROUPS = gql`
  query Groups($search: String) {
    groups(search: $search) {
      id
      name
      description
      createdBy {
        username
      }
      members {
        username
      }
    }
  }
`;


// ======= graphql/mutations.js =======
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!) {
    createUser(username: $username, email: $email) {
      id
      username
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!, $description: String, $createdBy: ID!) {
    createGroup(name: $name, description: $description, createdBy: $createdBy) {
      id
      name
    }
  }
`;

export const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup($groupId: ID!, $userId: ID!) {
    addUserToGroup(groupId: $groupId, userId: $userId) {
      id
      members {
        id
        username
      }
    }
  }
`;
