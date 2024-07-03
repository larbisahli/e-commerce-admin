import { gql } from '@apollo/client';

export const LANGUAGES = gql`
  query Languages(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $etag: String!
  ) {
    languageCount(etag: $etag) {
      count
    }
    languages(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      etag: $etag
    ) {
      id
      name
      localeId
      active
      direction
      isDefault
      isSystem
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
  query Language($id: Int!, $etag: String!) {
    language(id: $id, etag: $etag) {
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
  query GetLanguageSelect(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $etag: String!
  ) {
    languageSelect(page: $page, limit: $limit, orderBy: $orderBy, etag: $etag) {
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
    $active: Boolean!
    $direction: String!
    $translation: JSONObject!
  ) {
    updateLanguage(
      id: $id
      name: $name
      localeId: $localeId
      active: $active
      direction: $direction
      translation: $translation
    ) {
      id
      name
      etag {
        configEtag
      }
    }
  }
`;

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage(
    $name: String!
    $localeId: String!
    $active: Boolean!
    $direction: String!
    $translation: JSONObject!
  ) {
    createLanguage(
      name: $name
      localeId: $localeId
      active: $active
      direction: $direction
      translation: $translation
    ) {
      id
      name
      etag {
        configEtag
      }
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($id: Int!, $localeId: String!) {
    deleteLanguage(id: $id, localeId: $localeId) {
      id
      etag {
        configEtag
      }
    }
  }
`;

export const SET_DEFAULT_LANGUAGE = gql`
  mutation SetDefaultLanguage($id: Int!) {
    setDefaultLanguage(id: $id) {
      id
      name
      etag {
        configEtag
      }
    }
  }
`;
