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
    }
  }
`;

export const DELETE_IMAGE_OBJECT = gql`
  mutation DeleteImageObject($image: String!, $placeholder: String!) {
    deleteImageObject(image: $image, placeholder: $placeholder) {
      image
    }
  }
`;
