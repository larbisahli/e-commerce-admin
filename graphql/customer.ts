import { gql } from '@apollo/client';

export const CUSTOMER = gql`
  query Customer($id: Int!, $etag: String!) {
    customer(id: $id, etag: $etag) {
      id
      fullName
      email
      marketingOptIn
      registeredAt
      active
      tags {
        id
        name
      }
      address {
        id
        country {
          iso2
          name
        }
        email
        addressLine1
        addressLine2
        phoneNumber
        postalCode
        state
        city
        isDefault
      }
      registeredAt
    }
  }
`;

export const CUSTOMERS = gql`
  query Customers(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $etag: String!
  ) {
    customerCount(etag: $etag) {
      count
    }
    customers(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      etag: $etag
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
      updatedAt
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $fullName: String!
    $email: String!
    $active: Boolean
    $marketingOptIn: Boolean!
    $tags: [TagInput]
    $address: [CustomerAddressInput]
  ) {
    createCustomer(
      fullName: $fullName
      email: $email
      active: $active
      marketingOptIn: $marketingOptIn
      tags: $tags
      address: $address
    ) {
      id
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $id: Int!
    $fullName: String!
    $email: String!
    $active: Boolean
    $marketingOptIn: Boolean
    $tags: [TagInput]
    $address: [CustomerAddressInput]
  ) {
    updateCustomer(
      id: $id
      fullName: $fullName
      email: $email
      active: $active
      marketingOptIn: $marketingOptIn
      tags: $tags
      address: $address
    ) {
      id
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS = gql`
  mutation DeleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id) {
      id
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: Int!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`;
