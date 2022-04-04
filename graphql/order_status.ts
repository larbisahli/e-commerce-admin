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
      status_name
      color
      privacy
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

export const ORDER_STATUS = gql`
  query OrderStatusForAdmin($id: ID!) {
    orderStatusForAdmin(id: $id) {
      id
      status_name
      color
      privacy
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile {
          image
          placeholder
        }
      }
      updated_by {
        id
        first_name
        last_name
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
    $status_name: String!
    $color: String!
    $privacy: String!
  ) {
    createOrderStatus(
      status_name: $status_name
      color: $color
      privacy: $privacy
    ) {
      id
      status_name
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus(
    $id: ID!
    $status_name: String!
    $color: String!
    $privacy: String!
  ) {
    updateOrderStatus(
      id: $id
      status_name: $status_name
      color: $color
      privacy: $privacy
    ) {
      id
      status_name
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
