import { gql } from '@apollo/client';

export const ATTRIBUTE = gql`
  query attributes($id: ID!) {
    attributeForAdmin(id: $id) {
      id
      attribute_name
      attribute_values {
        id
        attribute_value
        color
      }
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile_img
      }
      updated_by {
        id
        first_name
        last_name
        profile_img
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
    attributesCount {
      count
    }
    attributesForAdmin(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      attribute_name
      attribute_values {
        id
        attribute_value
      }
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
      }
      updated_by {
        id
        first_name
        last_name
      }
    }
  }
`;

export const CREATE_ATTRIBUTE = gql`
  mutation CreateAttribute(
    $attribute_name: String!
    $attribute_values: [AttributeValueInput]
  ) {
    createAttribute(
      attribute_name: $attribute_name
      attribute_values: $attribute_values
    ) {
      attribute_name
    }
  }
`;

export const UPDATE_ATTRIBUTE = gql`
  mutation UpdateAttribute(
    $id: ID!
    $attribute_name: String!
    $attribute_values: [AttributeValueInput]
  ) {
    updateAttribute(
      id: $id
      attribute_name: $attribute_name
      attribute_values: $attribute_values
    ) {
      attribute_name
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DeleteAttribute($id: ID!) {
    deleteAttribute(id: $id) {
      attribute_name
    }
  }
`;

export const DELETE_ATTRIBUTE_VALUE = gql`
  mutation DeleteAttributeValue($id: ID!) {
    deleteAttributeValue(id: $id) {
      attribute_value
    }
  }
`;
