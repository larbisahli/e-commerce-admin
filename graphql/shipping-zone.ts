import { gql } from '@apollo/client';

export const SHIPPING_ZONE = gql`
  query ShippingZone($id: ID!) {
    shippingZone(id: $id) {
      id
      name
      displayName
      active
      freeShipping
      rateType
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
    zones(id: $id) {
      id
      name
      iso
    }
    shippingRates(id: $id) {
      id
      minValue
      maxValue
      noMax
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
      freeShipping
      rateType
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

export const COUNTRIES = gql`
  {
    countries {
      id
      iso
      name
      phoneCode
    }
  }
`;

export const CREATE_SHIPPING = gql`
  mutation CreateShippingZone(
    $name: String!
    $displayName: String!
    $active: Boolean!
    $freeShipping: Boolean!
    $rateType: String
    $shippingRates: [ShippingRateInput]
    $zones: [ZonesInput]!
  ) {
    createShippingZone(
      name: $name
      displayName: $displayName
      active: $active
      freeShipping: $freeShipping
      rateType: $rateType
      shippingRates: $shippingRates
      zones: $zones
    ) {
      id
    }
  }
`;

export const UPDATE_SHIPPING = gql`
  mutation UpdateShippingZone(
    $id: ID!
    $shippingZone: UpdateShippingZoneInput
    $additions: UpdateRateAndZoneInput
    $deletions: UpdateRateAndZoneInput
  ) {
    updateShippingZone(
      id: $id
      shippingZone: $shippingZone
      additions: $additions
      deletions: $deletions
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
