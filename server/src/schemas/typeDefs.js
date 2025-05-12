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



  input MoodResponseInput {

    category: String!

    question: String!

    answer: String!

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



    login(username: String, email: String, password: String!): AuthPayload



    saveMood(responses: [MoodResponseInput!]!): Mood



    addMemory(content: String, imageUrl: String): Memory



    deleteMemory(id: ID!): Boolean



    generateTextResponse(text: String!): String



    transcribeAudio(audio: Upload!): TranscriptionResponse

  }

`;



export default typeDefs;

