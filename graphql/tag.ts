import { gql } from '@apollo/client';

export const TAGS = gql`
  query Tags(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
    $etag: String!
  ) {
    tagCount(etag: $etag) {
      count
    }
    tags(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      etag: $etag
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
  query Tag($id: Int!, $language: LanguageInput!, $etag: String!) {
    tag(id: $id, language: $language, etag: $etag) {
      id
      name
      translated {
        name
      }
    }
  }
`;

export const TAGS_FOR_SELECT = gql`
  query GetTagsSelect(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $language: LanguageInput!
    $etag: String!
  ) {
    tagSelect(
      page: $page
      limit: $limit
      orderBy: $orderBy
      language: $language
      etag: $etag
    ) {
      id
      name
      translated {
        name
      }
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
      tagEtag
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
