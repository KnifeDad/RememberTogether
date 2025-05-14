import { gql } from 'apollo-server-express';

const typeDefs = gql`

  scalar Upload

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    memories: [Memory]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type MoodResponse {
    category: String!
    question: String!
    answer: String!
  }

  type Mood {
    _id: ID!
    user: ID!
    responses: [MoodResponse!]!
    createdAt: String!
  }

  type Memory {
    _id: ID!
    content: String
    imageUrl: String
    createdAt: String
    user: User
  }

  input MoodCategoryInput {
    question: String!
    answer: String!
  }

  input MoodInput {
    health: MoodCategoryInput!
    work: MoodCategoryInput!
    social: MoodCategoryInput!
    emotional: MoodCategoryInput!
    chores: MoodCategoryInput!
  }

  type TranscriptionResponse {
    transcript: String
    supportiveResponse: String
  }
  type Group {
    _id: ID!
    name: String!
    members: [User!]!
  }
  type Query {
    getSingleUser(id: ID, username: String): User
    getMe: User
    getMyMoods: [Mood]
    memories(id: ID!): Memory
    groups: [Group!]!
  }

  type Mutation {
    createUser(input: UserInput!): AuthPayload
    login(username: String, email: String, password: String!): AuthPayload

    # ✅ Updated this line:
    saveMood(input: MoodInput!): Mood

    getMemories(userId: ID!): [Memory]
    addMemory(content: String, imageUrl: String): Memory
    deleteMemory(id: ID!): Boolean

    generateTextResponse(text: String!): String
    transcribeAudio(audio: Upload!): TranscriptionResponse
    createGroup(name: String!): Group!
    joinGroup(groupId: ID!): Group!
    deleteGroup(groupId: ID!): Group
  }

`;

export default typeDefs;
