import { gql } from '@apollo/client';

export const DELIVERY_TIMES = gql`
  query DeliveryTimes(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    deliveryTimeCount {
      count
    }
    deliveryTimes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      timeUnit {
        unit
      }
      maxValue
      minValue
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
  query DeliveryTime($id: Int!) {
    deliveryTime(id: $id) {
      id
      name
      timeUnit {
        unit
      }
      maxValue
      minValue
    }
  }
`;

export const DELIVERY_TIME_SELECT = gql`
  query DeliveryTimeSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    deliveryTimeSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CREATE_DELIVERY_TIME = gql`
  mutation CreateDeliveryTime(
    $name: String!
    $timeUnit: UnitInput
    $minValue: Int
    $maxValue: Int
  ) {
    createDeliveryTime(
      name: $name
      timeUnit: $timeUnit
      minValue: $minValue
      maxValue: $maxValue
    ) {
      id
      name
    }
  }
`;

export const UPDATE_DELIVERY_TIME = gql`
  mutation UpdateDeliveryTime(
    $id: Int!
    $name: String!
    $timeUnit: UnitInput
    $minValue: Int
    $maxValue: Int
  ) {
    updateDeliveryTime(
      id: $id
      name: $name
      timeUnit: $timeUnit
      minValue: $minValue
      maxValue: $maxValue
    ) {
      id
      name
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
