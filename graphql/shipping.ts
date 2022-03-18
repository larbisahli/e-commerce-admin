import { gql } from '@apollo/client';

export const SHIPPING = gql`
  query Shipping($id: ID!) {
    shipping(id: $id) {
      id
      shipper_name
      active
      shipper_icon_path
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

export const SHIPPINGS = gql`
  query Shippings(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    shippingsCount {
      count
    }
    shippings(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      shipper_name
      active
      shipper_icon_path
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

export const SHIPPINGS_FOR_SELECT = gql`
  query ShippingsSelectForAdmin($page: Int!, $limit: Int!, $orderBy: String!) {
    shippingsSelectForAdmin(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      shipper_name
    }
  }
`;

export const CREATE_SHIPPING = gql`
  mutation CreateShipping(
    $shipper_name: String!
    $active: Boolean!
    $shipper_icon_path: String!
  ) {
    createShipping(
      shipper_name: $shipper_name
      active: $active
      shipper_icon_path: $shipper_icon_path
    ) {
      shipper_name
    }
  }
`;

export const UPDATE_SHIPPING = gql`
  mutation UpdateShipping(
    $id: ID!
    $shipper_name: String!
    $active: Boolean!
    $shipper_icon_path: String!
  ) {
    updateShipping(
      id: $id
      shipper_name: $shipper_name
      active: $active
      shipper_icon_path: $shipper_icon_path
    ) {
      shipper_name
    }
  }
`;

export const DELETE_SHIPPING = gql`
  mutation DeleteShipping($id: ID!) {
    deleteShipping(id: $id) {
      shipper_name
    }
  }
`;
