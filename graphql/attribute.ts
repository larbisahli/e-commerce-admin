import { gql } from '@apollo/client';

export const ATTRIBUTE = gql`
  query Attribute($id: Int!) {
    attribute(id: $id) {
      id
      name
      values {
        id
        value
        color
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
    attributeCount {
      count
    }
    attributes(
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
  query Attributes(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    attributes(
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
    $id: Int!
    $name: String!
    $values: [AttributeValueInput]
  ) {
    updateAttribute(id: $id, name: $name, values: $values) {
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
