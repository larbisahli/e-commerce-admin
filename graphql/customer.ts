import { gql } from '@apollo/client';

export const CUSTOMER = gql`
  query ShippingZone($id: Int!, $language: LanguageInput!) {
    shippingZone(id: $id, language: $language) {
      id
    }
  }
`;

export const CUSTOMERS = gql`
  query Customers(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    customerCount {
      count
    }
    customers(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      fullName
      marketingOptIn
      registeredAt
      address {
        addressLine1
        phoneNumber
        email
        country {
          name
        }
      }
      registeredAt
    }
  }
`;

export const CREATE_CUSTOMER = gql`
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

export const UPDATE_CUSTOMER = gql`
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

export const DELETE_CUSTOMER = gql`
  mutation DeleteShippingZone($id: Int!) {
    deleteShippingZone(id: $id) {
      id
    }
  }
`;
