import { gql } from '@apollo/client';

export const MEDIA = gql`
  query Media($id: ID, $page: Int!, $limit: Int!) {
    media(id: $id, page: $page, limit: $limit) {
      parent {
        id
        name
        parentId
        image {
          id
          image
          placeholder
          width
          height
          mimeType
          size
          createdAt
        }
        createdAt
        itemsCount
      }
      children {
        id
        name
        parentId
        image {
          id
          image
          placeholder
          size
          width
          height
          mimeType
          createdAt
        }
        itemsCount
        createdAt
      }
      mediaTotalCount {
        count
      }
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteMediaImage($parentId: ID, $imageId: Int!, $mediaId: ID!) {
    deleteMediaImage(
      parentId: $parentId
      imageId: $imageId
      mediaId: $mediaId
    ) {
      id
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation CreateMediaFolder($parentId: ID, $name: String!) {
    createMediaFolder(parentId: $parentId, name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_FOLDER = gql`
  mutation UpdateMediaFolder($id: ID!, $name: String!) {
    updateMediaFolder(id: $id, name: $name) {
      id
      name
    }
  }
`;
