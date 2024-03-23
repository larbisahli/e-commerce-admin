import { gql } from '@apollo/client';

export const ORDER = gql`
  query Order($id: Int!) {
    order(id: $id) {
      id
    }
  }
`;

export const ORDERS = gql`
  query Orders(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    orderCount {
      count
    }
    orders(page: $page, limit: $limit, orderBy: $orderBy, sortedBy: $sortedBy) {
      id
      orderNumber
      totalQuantity
      grandTotalInclTax
      grandTotalExclTax
      orderApprovedAt
      paymentCode
      customer {
        fullName
        address {
          addressLine1
        }
      }
      orderStatus {
        id
        color
        label
      }
      paymentStatus {
        id
        color
        label
      }
      deliveryStatus {
        id
        color
        label
      }
    }
  }
`;

export const CREATE_ORDER = gql`
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

export const UPDATE_ORDER = gql`
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

export const DELETE_ORDER = gql`
  mutation DeleteShippingZone($id: Int!) {
    deleteShippingZone(id: $id) {
      id
    }
  }
`;
