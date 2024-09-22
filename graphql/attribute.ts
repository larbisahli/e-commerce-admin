import { gql } from '@apollo/client';

export const ATTRIBUTE = gql`
  query Attribute($id: Int!, $language: LanguageInput!, $etag: String!) {
    attribute(id: $id, language: $language, etag: $etag) {
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
    $etag: String!
  ) {
    attributeCount(etag: $etag) {
      count
    }
    attributes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      etag: $etag
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
    $etag: String!
  ) {
    attributes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      etag: $etag
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
      etag {
        attributeEtag
      }
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
      id
      etag {
        attributeEtag
      }
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DeleteAttribute($id: Int!) {
    deleteAttribute(id: $id) {
      id
      etag {
        attributeEtag
      }
    }
  }
`;

export const DELETE_ATTRIBUTE_VALUE = gql`
  mutation DeleteAttributeValue($id: Int!) {
    deleteAttributeValue(id: $id) {
      id
      etag {
        attributeEtag
      }
    }
  }
`;
