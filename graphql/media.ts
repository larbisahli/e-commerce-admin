import { gql } from '@apollo/client';

export const PHOTOS = gql`
  query Media($id: ID, $page: Int!, $limit: Int!) {
    media(id: $id, page: $page, limit: $limit) {
      parent {
        id
        name
        image {
          id
          image
          placeholder
          size
          createdAt
        }
        createdAt
        itemsCount
      }
      children {
        id
        name
        itemsCount
      }
    }
  }
`;

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
          createdAt
        }
        itemsCount
      }
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
