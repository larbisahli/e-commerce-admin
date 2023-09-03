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
      name
      localeId
      active
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
      name
      localeId
      active
      direction
      translation
    }
  }
`;

export const LANGUAGES_FOR_SELECT = gql`
  query GetLanguageSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    languageSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
      localeId
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage(
    $id: Int!
    $name: String!
    $localeId: String!
    $direction: String!
    $translation: JSONObject!
  ) {
    updateLanguage(
      id: $id
      name: $name
      localeId: $localeId
      direction: $direction
      translation: $translation
    ) {
      id
      name
    }
  }
`;

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage(
    $name: String!
    $localeId: String!
    $direction: String!
    $translation: JSONObject!
  ) {
    createLanguage(
      name: $displayName
      localeId: $localeId
      direction: $direction
      translation: $translation
    ) {
      id
      name
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($id: Int!, $localeId: String!) {
    deleteLanguage(id: $id, localeId: $localeId) {
      id
    }
  }
`;
