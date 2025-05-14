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



    media: [Media]



    createdAt: String



    category: String



    reminder: Reminder



    user: User
  }

  input MoodCategoryInput {
    question: String!
    answer: String!
  }


  type Media {

    type: String!



    url: String!



    thumbnailUrl: String



    duration: Float



    size: Float



    mimeType: String



    createdAt: String

  }



  input MediaInput {

    type: String!



    url: String!



    thumbnailUrl: String



    duration: Float



    size: Float



    mimeType: String

  }



  type Reminder {

    enabled: Boolean



    date: String



    type: String



    lastNotified: String

  }



  type Media {

    type: String!



    url: String!



    thumbnailUrl: String



    duration: Float



    size: Float



    mimeType: String



    createdAt: String

  }



  input MediaInput {

    type: String!



    url: String!



    thumbnailUrl: String



    duration: Float



    size: Float



    mimeType: String

  }



  type Reminder {

    enabled: Boolean



    date: String



    type: String



    lastNotified: String

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

  input ReminderInput {

    enabled: Boolean



    date: String



    type: String

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



    login(email: String!, password: String!): AuthPayload



    saveMood(input: MoodInput!): Mood



    addMemory(

      content: String

      media: [MediaInput]

      createdAt: String

      category: String

      reminder: ReminderInput

    ): Memory



    deleteMemory(id: ID!): Boolean

    generateTextResponse(text: String!): String
    transcribeAudio(audio: Upload!): TranscriptionResponse
    createGroup(name: String!): Group!
    joinGroup(groupId: ID!): Group!
    deleteGroup(groupId: ID!): Group
  }

`;

export default typeDefs;
