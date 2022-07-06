import { gql } from '@apollo/client';

export const SHIPPING = gql`
  query Shipping($id: ID!) {
    shipping(id: $id) {
      id
      shipper_name
      active
      thumbnail {
        image
        placeholder
      }
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
      thumbnail {
        image
        placeholder
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

export const COUNTRIES = gql`
  {
    countries {
      id
      iso
      name
    }
  }
`;

// Remove this
export const SHIPPINGS_FOR_SELECT = gql`
  query ShippingsSelectForAdmin($page: Int!, $limit: Int!, $orderBy: String!) {
    shippingsSelectForAdmin(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      shipper_name
    }
  }
`;

export const CREATE_SHIPPING = gql`
  mutation CreateShippingZone(
    $name: String!
    $display_name: String!
    $active: Boolean!
    $free_shipping: Boolean!
    $rate_type: String!
    $shipping_rates: [ShippingRateInput]
    $zones: [ZonesInput]!
  ) {
    createShippingZone(
      name: $name
      display_name: $display_name
      active: $active
      free_shipping: $free_shipping
      rate_type: $rate_type
      shipping_rates: $shipping_rates
      zones: $zones
    ) {
      id
    }
  }
`;

export const UPDATE_SHIPPING = gql`
  mutation UpdateShippingZone(
    $id: ID!
    $name: String!
    $display_name: String!
    $active: Boolean!
    $free_shipping: Boolean!
    $rate_type: String!
    $shipping_rates: [ShippingRateInput]
    $zones: [ZonesInput]!
  ) {
    updateShippingZone(
      id: $id
      name: $name
      display_name: $display_name
      active: $active
      free_shipping: $free_shipping
      rate_type: $rate_type
      shipping_rates: $shipping_rates
      zones: $zones
    ) {
      id
    }
  }
`;

export const DELETE_SHIPPING = gql`
  mutation DeleteShipping($id: ID!) {
    deleteShipping(id: $id) {
      id
    }
  }
`;
