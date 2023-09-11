import { gql } from '@apollo/client';

export const DELIVERY_TIMES = gql`
  query DeliveryTimes(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
  ) {
    deliveryTimeCount {
      count
    }
    deliveryTimes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
    ) {
      id
      name
      translated {
        name
      }
      unit {
        unit
      }
      max
      min
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

export const DELIVERY_TIME = gql`
  query DeliveryTime($id: Int!, $language: LanguageInput!) {
    deliveryTime(id: $id, language: $language) {
      id
      name
      translated {
        name
      }
      unit {
        unit
      }
      max
      min
    }
  }
`;

export const DELIVERY_TIME_SELECT = gql`
  query DeliveryTimeSelect(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $language: LanguageInput!
  ) {
    deliveryTimeSelect(
      page: $page
      limit: $limit
      orderBy: $orderBy
      language: $language
    ) {
      id
      name
    }
  }
`;

export const CREATE_DELIVERY_TIME = gql`
  mutation CreateDeliveryTime(
    $name: String!
    $unit: UnitInput!
    $min: Int!
    $max: Int!
    $language: LanguageInput!
  ) {
    createDeliveryTime(
      name: $name
      unit: $unit
      min: $min
      max: $max
      language: $language
    ) {
      id
    }
  }
`;

export const UPDATE_DELIVERY_TIME = gql`
  mutation UpdateDeliveryTime(
    $id: Int!
    $name: String!
    $unit: UnitInput!
    $min: Int!
    $max: Int!
    $language: LanguageInput!
  ) {
    updateDeliveryTime(
      id: $id
      name: $name
      unit: $unit
      min: $min
      max: $max
      language: $language
    ) {
      id
    }
  }
`;

export const DELETE_DELIVERY_TIME = gql`
  mutation DeleteDeliveryTime($id: Int!) {
    deleteDeliveryTime(id: $id) {
      id
      name
    }
  }
`;
