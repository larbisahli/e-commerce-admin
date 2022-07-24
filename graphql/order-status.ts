import { gql } from '@apollo/client';

export const ORDER_STATUSES = gql`
  query OrderStatusesForAdmin(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    orderStatusCount {
      count
    }
    orderStatusesForAdmin(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      color
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
  query OrderStatusForAdmin($id: ID!) {
    orderStatusForAdmin(id: $id) {
      id
      name
      color
      privacy
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

export const CREATE_ORDER_STATUS = gql`
  mutation CreateOrderStatus(
    $name: String!
    $color: String!
    $privacy: String!
  ) {
    createOrderStatus(name: $name, color: $color, privacy: $privacy) {
      id
      name
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus(
    $id: ID!
    $name: String!
    $color: String!
    $privacy: String!
  ) {
    updateOrderStatus(id: $id, name: $name, color: $color, privacy: $privacy) {
      id
      name
    }
  }
`;

export const DELETE_ORDER_STATUS = gql`
  mutation DeleteOrderStatus($id: ID!) {
    deleteOrderStatus(id: $id) {
      id
      status_name
    }
  }
`;
