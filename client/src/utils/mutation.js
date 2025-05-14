import { gql } from '@apollo/client';

// GraphQL mutation for registering a new user
export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const UPLOAD_AUDIO = gql`
  mutation TranscribeAudio($audio: Upload!) {
    transcribeAudio(audio: $audio) {
      transcript
      supportiveResponse
    }
  }
`;

export const GET_TEXT_RESPONSE = gql`
  mutation GenerateTextResponse($text: String!) {
    generateTextResponse(text: $text)
  }
`;

export const ADD_MEMORY = gql`
  mutation AddMemory(
    $content: String
    $media: [MediaInput]
    $createdAt: String
    $category: String
    $reminder: ReminderInput
  ) {
    addMemory(
      content: $content
      media: $media
      createdAt: $createdAt
      category: $category
      reminder: $reminder
    ) {
      _id
      content
      media {
        type
        url
        thumbnailUrl
        duration
        size
        mimeType
        createdAt
      }
      createdAt
      category
      reminder {
        enabled
        date
        type
        lastNotified
      }
    }
  }
`;
export const DELETE_MEMORY = gql`
  mutation DeleteMemory($id: ID!) {
    deleteMemory(id: $id)
  }
`;

export const SAVE_MOOD = gql`
  mutation SaveMood($input: MoodInput!) {
    saveMood(input: $input) {
      _id
      createdAt
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!) {
    createGroup(name: $name) {
      _id
      name
    }
  }
`;

export const JOIN_GROUP = gql`
  mutation JoinGroup($groupId: ID!) {
    joinGroup(groupId: $groupId) {
      _id
      name
    }
  }
`;
export const DELETE_GROUP = gql`
  mutation DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId) {
      _id
      name
    }
  }
`;
