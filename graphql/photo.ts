import { gql } from '@apollo/client';

export const PHOTOS = gql`
  query Photos(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    photoCount {
      count
    }
    photos(page: $page, limit: $limit, orderBy: $orderBy, sortedBy: $sortedBy) {
      id
      image
      placeholder
      createdAt
      size
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`;
