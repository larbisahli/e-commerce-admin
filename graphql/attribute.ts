import { gql } from '@apollo/client';

export const ATTRIBUTE = gql`
  query Attribute($id: Int!, $language: LanguageInput!) {
    attribute(id: $id, language: $language) {
      id
      name
      type
      translated {
        name
      }
      values {
        id
        value
        name
        translated {
          name
          value
        }
      }
    }
  }
`;

export const ATTRIBUTES = gql`
  query Attributes(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
  ) {
    attributeCount {
      count
    }
    attributes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
    ) {
      id
      name
      type
      translated {
        name
      }
      values {
        id
        name
        value
        translated {
          name
          value
        }
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

export const ATTRIBUTES_FOR_SELECT = gql`
  query Attributes(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
  ) {
    attributes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
    ) {
      id
      name
      type
      translated {
        name
      }
      values {
        id
        name
        value
        translated {
          name
          value
        }
      }
    }
  }
`;

export const CREATE_ATTRIBUTE = gql`
  mutation CreateAttribute(
    $name: String!
    $type: String!
    $values: [AttributeValueInput]
    $language: LanguageInput!
  ) {
    createAttribute(
      name: $name
      type: $type
      values: $values
      language: $language
    ) {
      id
    }
  }
`;

export const UPDATE_ATTRIBUTE = gql`
  mutation UpdateAttribute(
    $id: Int!
    $name: String!
    $type: String!
    $values: [AttributeValueInput]
    $language: LanguageInput!
  ) {
    updateAttribute(
      id: $id
      name: $name
      type: $type
      values: $values
      language: $language
    ) {
      name
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DeleteAttribute($id: Int!) {
    deleteAttribute(id: $id) {
      name
    }
  }
`;

export const DELETE_ATTRIBUTE_VALUE = gql`
  mutation DeleteAttributeValue($id: Int!) {
    deleteAttributeValue(id: $id) {
      value
    }
  }
`;
