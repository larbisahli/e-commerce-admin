import { gql } from '@apollo/client';

export const SHIPPING_ZONE = gql`
  query ShippingZone($id: ID!) {
    shippingZone(id: $id) {
      id
      name
      display_name
      active
      free_shipping
      rate_type
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
    zones(id: $id) {
      id
      name
      iso
    }
    shippingRates(id: $id) {
      id
      min_value
      max_value
      no_max
      price
    }
  }
`;

export const SHIPPING_ZONES = gql`
  query Shippings(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    shippingZonesCount {
      count
    }
    shippingZones(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      active
      free_shipping
      rate_type
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
    $rate_type: String
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
    $rate_type: String
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
