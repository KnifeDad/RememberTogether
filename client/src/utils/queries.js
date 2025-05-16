import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    getMe {
      _id
      username
      email
      memories {
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
  }
`;

export const GET_MEMORIES = gql`
  query GetMemories($userId: ID!) {
    getMemories(userId: $userId) {
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
      user {
        userId
      }
    }
  }
`;

export const GET_MY_MOODS = gql`
  query GetMyMoods {
    getMyMoods {
      _id
      createdAt
      health {
        question1
        question2
      }
      work {
        question1
        question2
      }
      social {
        question1
        question2
      }
      emotional {
        question1
        question2
      }
      chores {
        question1
        question2
      }
    }
  }
`;
export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      _id
      name
      members {
        _id
        username
      }
    }
  }
`;
