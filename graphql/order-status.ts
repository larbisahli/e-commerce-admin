import { gql } from '@apollo/client';

export const ORDER_STATUSES = gql`
  query orderStatuses(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
    $etag: String!
  ) {
    orderStatusCount(etag: $etag) {
      count
    }
    orderStatuses(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      etag: $etag
    ) {
      id
      label
      color
      translated {
        label
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

export const ORDER_STATUSES_FOR_SELECT = gql`
  query OrderStatusForSelect(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $etag: String!
  ) {
    orderStatusForSelect(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      etag: $etag
    ) {
      id
      label
    }
  }
`;

export const ORDER_STATUS = gql`
  query GetOrderStatus($id: Int!, $language: LanguageInput!, $etag: String!) {
    orderStatus(id: $id, language: $language, etag: $etag) {
      id
      label
      translated {
        label
      }
      status
      color
      privacy
    }
  }
`;

export const CREATE_ORDER_STATUS = gql`
  mutation CreateOrderStatus(
    $label: String!
    $status: String!
    $color: String!
    $privacy: String!
    $language: LanguageInput!
  ) {
    createOrderStatus(
      label: $label
      status: $status
      color: $color
      privacy: $privacy
      language: $language
    ) {
      id
      etag {
        orderStatusEtag
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus(
    $id: Int!
    $label: String!
    $status: String!
    $color: String!
    $privacy: String!
    $language: LanguageInput!
  ) {
    updateOrderStatus(
      id: $id
      label: $label
      status: $status
      color: $color
      privacy: $privacy
      language: $language
    ) {
      id
      etag {
        orderStatusEtag
      }
    }
  }
`;

export const DELETE_ORDER_STATUS = gql`
  mutation DeleteOrderStatus($id: Int!) {
    deleteOrderStatus(id: $id) {
      id
      etag {
        orderStatusEtag
      }
    }
  }
`;
