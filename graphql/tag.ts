import { gql } from '@apollo/client';

export const TAGS = gql`
  query Tags($page: Int!, $limit: Int!, $orderBy: String!, $sortedBy: String!) {
    getTagsCount {
      count
    }
    getTags(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      icon
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
  query Tag($id: ID!) {
    getTag(id: $id) {
      id
      name
      icon
    }
  }
`;

export const TAGS_FOR_SELECT = gql`
  query GetTagsSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    getTagsSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!, $icon: String) {
    createTag(name: $name, icon: $icon) {
      id
      name
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $name: String!, $icon: String) {
    updateTag(id: $id, name: $name, icon: $icon) {
      id
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
      name
    }
  }
`;
