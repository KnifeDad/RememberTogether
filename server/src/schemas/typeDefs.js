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



  input MoodResponseInput {

    category: String!

    question: String!

    answer: String!

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



  type Query {

    getSingleUser(id: ID, username: String): User



    getMe: User



    getMyMoods: [Mood]



    memories: [Memory]



    memory(id: ID!): Memory

  }



  type Mutation {

    createUser(input: UserInput!): AuthPayload



    login(email: String!, password: String!): AuthPayload



    saveMood(responses: [MoodResponseInput!]!): Mood



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

  }

`;



export default typeDefs;

