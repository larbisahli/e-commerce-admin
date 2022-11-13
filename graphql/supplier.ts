import { gql } from '@apollo/client';

export const SUPPLIER = gql`
  query Supplier($id: ID!) {
    supplier(id: $id) {
      id
      name
      company
      phoneNumber
      addressLine1
      addressLine2
      country {
        id
        name
      }
      city
      note
    }
  }
`;

export const SUPPLIERS = gql`
  query Suppliers(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    suppliersCount {
      count
    }
    suppliers(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      company
      phoneNumber
      addressLine1
      country {
        id
        name
      }
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
  }
`;

export const SUPPLIERS_FOR_SELECT = gql`
  query SuppliersForSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    suppliersForSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CREATE_SUPPLIER = gql`
  mutation CreateSupplier(
    $name: String!
    $company: String
    $phoneNumber: String
    $addressLine1: String!
    $addressLine2: String
    $country: CountryInput
    $city: String
    $note: String
  ) {
    createSupplier(
      name: $name
      company: $company
      phoneNumber: $phoneNumber
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      country: $country
      city: $city
      note: $note
    ) {
      name
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier(
    $id: ID!
    $name: String!
    $company: String
    $phoneNumber: String
    $addressLine1: String!
    $addressLine2: String
    $country: CountryInput
    $city: String
    $note: String
  ) {
    updateSupplier(
      id: $id
      name: $name
      company: $company
      phoneNumber: $phoneNumber
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      country: $country
      city: $city
      note: $note
    ) {
      name
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation DeleteSupplier($id: ID!) {
    deleteSupplier(id: $id) {
      name
    }
  }
`;
