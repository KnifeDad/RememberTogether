import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
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

  type Mood {
    id: ID!
    mood: String!
    date: String!
    notes: String
  }

  type TranscriptionResponse {
    transcript: String
    supportiveResponse: String
  }

  type Query {
    getSingleUser(id: ID, username: String): User
    getMe: User
    getMoods: [Mood]
  }

  type Mutation {
    createUser(input: UserInput!): AuthPayload
    login(username: String, email: String, password: String!): AuthPayload
    addMood(mood: String!, notes: String): Mood
    generateTextResponse(text: String!): String
    transcribeAudio(audio: Upload!): TranscriptionResponse
  }
`;

export default typeDefs;
