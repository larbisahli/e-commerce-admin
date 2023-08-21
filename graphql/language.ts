import { gql } from '@apollo/client';

export const LANGUAGES = gql`
  query Languages(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    languageCount {
      count
    }
    languages(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      displayName
      lcid
      direction
      isDefault
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

export const LANGUAGE = gql`
  query Language($id: Int!) {
    language(id: $id) {
      id
      displayName
      lcid
      direction
      translation
    }
  }
`;

export const LANGUAGES_FOR_SELECT = gql`
  query GetLanguageSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    languageSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      displayName
      lcid
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage(
    $id: Int!
    $displayName: String!
    $lcid: String!
    $direction: String!
    $translation: JSONObject!
  ) {
    updateLanguage(
      id: $id
      displayName: $displayName
      lcid: $lcid
      direction: $direction
      translation: $translation
    ) {
      id
      displayName
    }
  }
`;

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage(
    $displayName: String!
    $lcid: String!
    $direction: String!
    $translation: JSONObject!
  ) {
    createLanguage(
      displayName: $displayName
      lcid: $lcid
      direction: $direction
      translation: $translation
    ) {
      id
      displayName
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($id: Int!, $lcid: String!) {
    deleteLanguage(id: $id, lcid: $lcid) {
      id
    }
  }
`;
