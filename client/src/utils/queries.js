import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      memories {
        _id
        content
        imageUrl
        createdAt
      }
    }
  }
`;
export const GET_MEMORIES = gql`
  query Memories {
    memories {
      _id
      content
      imageUrl
      createdAt
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
