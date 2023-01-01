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
    }
    zones(id: $id) {
      id
      zoneId
      name
      iso2
    }
    shippingRates(id: $id) {
      id
      weightUnit {
        unit
      }
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
    shippingZoneCount {
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

export const CREATE_SHIPPING = gql`
  mutation CreateShippingZone(
    $name: String!
    $displayName: String!
    $active: Boolean!
    $freeShipping: Boolean!
    $rateType: String
    $shippingRates: [ShippingRateInput]
    $zones: [CountryInput]!
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
    $id: Int!
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
  mutation DeleteShippingZone($id: Int!) {
    deleteShippingZone(id: $id) {
      id
    }
  }
`;
