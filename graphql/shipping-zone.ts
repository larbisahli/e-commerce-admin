import { gql } from '@apollo/client';

export const SHIPPING_ZONE = gql`
  query ShippingZone($id: Int!) {
    shippingZone(id: $id) {
      id
      logo {
        id
        image
        placeholder
      }
      name
      displayName
      active
      freeShipping
      rateType
      deliveryTime {
        id
        name
      }
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
      logo {
        id
        image
        placeholder
      }
      name
      active
      freeShipping
      rateType
      deliveryTime {
        id
        name
      }
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
    $logo: [ImageInput]
    $displayName: String!
    $active: Boolean!
    $freeShipping: Boolean!
    $rateType: String
    $shippingRates: [ShippingRateInput]
    $zones: [CountryInput]!
    $deliveryTime: deliveryTimeInput
  ) {
    createShippingZone(
      name: $name
      logo: $logo
      displayName: $displayName
      active: $active
      freeShipping: $freeShipping
      rateType: $rateType
      shippingRates: $shippingRates
      zones: $zones
      deliveryTime: $deliveryTime
    ) {
      id
    }
  }
`;

export const UPDATE_SHIPPING = gql`
  mutation UpdateShippingZone(
    $id: Int!
    $shippingZone: ShippingZoneInput
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
