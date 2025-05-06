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

  type Query {
    getSingleUser(id: ID, username: String): User
    getMe: User
  }
  type TranscriptionResponse {
    transcript: String
    supportiveResponse: String
  }

  type Mutation {
    createUser(input: UserInput!): AuthPayload
    login(username: String, email: String, password: String!): AuthPayload
    transcribeAudio(audio: Upload!): TranscriptionResponse
    generateTextResponse(text: String!): String
  }
`;

export default typeDefs;
