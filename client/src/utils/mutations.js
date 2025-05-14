import { gql } from '@apollo/client';

export const ADD_MEMORY = gql`
  mutation addMemory(
    $content: String
    $imageUrl: String
    $createdAt: String
    $category: String
    $reminder: ReminderInput
  ) {
    addMemory(
      content: $content
      imageUrl: $imageUrl
      createdAt: $createdAt
      category: $category
      reminder: $reminder
    ) {
      _id
      content
      imageUrl
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
  mutation deleteMemory($id: ID!) {
    deleteMemory(id: $id)
  }
`;
