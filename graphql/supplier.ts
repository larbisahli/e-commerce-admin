import { gql } from '@apollo/client';

export const SUPPLIER = gql`
  query attributes($id: ID!) {
    supplier(id: $id) {
      id
      supplier_name
      company
      phone_number
      dial_code
      address_line1
      address_line2
      country
      city
      note
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
      supplier_name
      company
      phone_number
      dial_code
      address_line1
      country
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

export const SUPPLIERS_FOR_SELECT = gql`
  query SuppliersForSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    suppliersForSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      supplier_name
    }
  }
`;

export const CREATE_SUPPLIER = gql`
  mutation CreateSupplier(
    $supplier_name: String!
    $company: String
    $phone_number: String
    $dial_code: String
    $address_line1: String!
    $address_line2: String
    $country: String
    $city: String
    $note: String
  ) {
    createSupplier(
      supplier_name: $supplier_name
      company: $company
      phone_number: $phone_number
      dial_code: $dial_code
      address_line1: $address_line1
      address_line2: $address_line2
      country: $country
      city: $city
      note: $note
    ) {
      supplier_name
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier(
    $id: ID!
    $supplier_name: String!
    $company: String
    $phone_number: String
    $dial_code: String
    $address_line1: String!
    $address_line2: String
    $country: String
    $city: String
    $note: String
  ) {
    updateSupplier(
      id: $id
      supplier_name: $supplier_name
      company: $company
      phone_number: $phone_number
      dial_code: $dial_code
      address_line1: $address_line1
      address_line2: $address_line2
      country: $country
      city: $city
      note: $note
    ) {
      supplier_name
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation DeleteSupplier($id: ID!) {
    deleteSupplier(id: $id) {
      supplier_name
    }
  }
`;
