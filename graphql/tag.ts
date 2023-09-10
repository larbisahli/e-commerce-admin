import { gql } from '@apollo/client';

export const TAGS = gql`
  query Tags(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
  ) {
    tagCount {
      count
    }
    tags(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
    ) {
      id
      name
      translated {
        name
      }
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
  query Tag($id: Int!, $language: LanguageInput!) {
    tag(id: $id, language: $language) {
      id
      name
      translated {
        name
      }
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
  mutation CreateTag($name: String!, $language: LanguageInput!) {
    createTag(name: $name, language: $language) {
      id
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: Int!, $name: String!, $language: LanguageInput!) {
    updateTag(id: $id, name: $name, language: $language) {
      id
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: Int!) {
    deleteTag(id: $id) {
      id
    }
  }
`;
