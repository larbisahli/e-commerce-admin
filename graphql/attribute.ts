import { gql } from '@apollo/client';

export const ATTRIBUTE = gql`
  query attribute($id: ID!) {
    getAttribute(id: $id) {
      id
      name
      values {
        id
        value
        color
      }
      createdAt
      updatedAt
      createdBy {
        id
        firstName
        lastName
        profile {
          image
          placeholder
        }
      }
      updatedBy {
        id
        firstName
        lastName
        profile {
          image
          placeholder
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
  ) {
    getAttributesCount {
      count
    }
    getAttributes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      values {
        id
        value
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
  query AttributesForSelect(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    attributesForAdmin(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      values {
        id
        value
      }
    }
  }
`;

export const CREATE_ATTRIBUTE = gql`
  mutation CreateAttribute($name: String!, $values: [AttributeValueInput]) {
    createAttribute(name: $name, values: $values) {
      name
    }
  }
`;

export const UPDATE_ATTRIBUTE = gql`
  mutation UpdateAttribute(
    $id: ID!
    $name: String!
    $values: [AttributeValueInput]
  ) {
    updateAttribute(id: $id, name: $name, values: $values) {
      name
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DeleteAttribute($id: ID!) {
    deleteAttribute(id: $id) {
      name
    }
  }
`;

export const DELETE_ATTRIBUTE_VALUE = gql`
  mutation DeleteAttributeValue($id: ID!) {
    deleteAttributeValue(id: $id) {
      value
    }
  }
`;
