import { gql } from '@apollo/client';

export const ORDER_STATUSES = gql`
  query orderStatuses(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $etag: String!
  ) {
    orderStatuses(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      etag: $etag
    ) {
      id
      status
      color
      description
    }
  }
`;

export const ORDER_STATUS = gql`
  query GetOrderStatus($id: String!, $etag: String!) {
    orderStatus(id: $id, etag: $etag) {
      id
      status
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: String!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      etag {
        orderStatusEtag
      }
    }
  }
`;
