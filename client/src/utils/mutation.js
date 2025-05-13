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
