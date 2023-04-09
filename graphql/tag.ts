import { gql } from '@apollo/client';

export const TAGS = gql`
  query Tags($page: Int!, $limit: Int!, $orderBy: String!, $sortedBy: String!) {
    tagCount {
      count
    }
    tags(page: $page, limit: $limit, orderBy: $orderBy, sortedBy: $sortedBy) {
      id
      name
      createdAt
      updatedAt
      createdBy {
        id
        firstName
        lastName
      }
      updatedBy {
        id
        firstName
        lastName
      }
    }
  }
`;

export const TAG = gql`
  query Tag($id: Int!) {
    tag(id: $id) {
      id
      name
      icon
    }
  }
`;

export const TAGS_FOR_SELECT = gql`
  query GetTagsSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    tagSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: Int!, $name: String!) {
    updateTag(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: Int!) {
    deleteTag(id: $id) {
      id
      name
    }
  }
`;
