import { gql } from '@apollo/client';

export const ORDER_STATUSES = gql`
  query orderStatuses(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
    $defaultLanguage: LanguageInput!
  ) {
    orderStatusCount {
      count
    }
    orderStatuses(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      defaultLanguage: $defaultLanguage
    ) {
      id
      name
      color
      translated {
        name
      }
      privacy
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

export const ORDER_STATUS = gql`
  query GetOrderStatus(
    $id: Int!
    $language: LanguageInput!
    $defaultLanguage: LanguageInput!
  ) {
    orderStatus(
      id: $id
      language: $language
      defaultLanguage: $defaultLanguage
    ) {
      id
      name
      translated {
        name
      }
      color
      privacy
    }
  }
`;

export const CREATE_ORDER_STATUS = gql`
  mutation CreateOrderStatus(
    $name: String!
    $color: String!
    $privacy: String!
    $language: LanguageInput!
  ) {
    createOrderStatus(
      name: $name
      color: $color
      privacy: $privacy
      language: $language
    ) {
      id
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus(
    $id: Int!
    $name: String!
    $color: String!
    $privacy: String!
    $language: LanguageInput!
  ) {
    updateOrderStatus(
      id: $id
      name: $name
      color: $color
      privacy: $privacy
      language: $language
    ) {
      id
    }
  }
`;

export const DELETE_ORDER_STATUS = gql`
  mutation DeleteOrderStatus($id: Int!) {
    deleteOrderStatus(id: $id) {
      id
    }
  }
`;
