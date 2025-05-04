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
