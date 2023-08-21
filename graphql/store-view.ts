import { gql } from '@apollo/client';

export const STORE_VIEWS = gql`
  query StoreViews(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    storeViewCount {
      count
    }
    storeViews(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      code
      language {
        id
        displayName
      }
      active
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

export const STORE_VIEW = gql`
  query StoreView($id: Int!) {
    storeView(id: $id) {
      id
      name
      code
      language {
        id
        displayName
        lcid
      }
      active
      isDefault
    }
  }
`;

export const STORE_VIEW_FOR_SELECT = gql`
  query GetStoreViewSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    storeViewSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const SET_DEFAULT_STORE_VIEW = gql`
  mutation SetDefaultStoreView($id: Int!) {
    setDefaultStoreView(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_STORE_VIEW = gql`
  mutation UpdateLanguage(
    $id: Int!
    $name: String!
    $code: String!
    $language: LanguageInput!
    $active: Boolean!
    $isDefault: Boolean!
  ) {
    updateLanguage(
      id: $id
      name: $name
      code: $code
      language: $language
      active: $active
      isDefault: $isDefault
    ) {
      id
      name
    }
  }
`;

export const CREATE_STORE_VIEW = gql`
  mutation CreateLanguage(
    $name: String!
    $code: String!
    $language: LanguageInput!
    $active: Boolean!
    $isDefault: Boolean!
  ) {
    createLanguage(
      name: $name
      code: $code
      language: $language
      active: $active
      isDefault: $isDefault
    ) {
      id
      name
    }
  }
`;

export const DELETE_STORE_VIEW = gql`
  mutation DeleteStoreView($id: Int!) {
    deleteStoreView(id: $id) {
      id
    }
  }
`;
