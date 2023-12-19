import { gql } from '@apollo/client';

export const TAXES = gql`
  query Taxes(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    taxCount {
      count
    }
    taxes(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      rate
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

export const TAX = gql`
  query Tax($id: Int!) {
    tax(id: $id) {
      id
      name
      rate
      countries {
        iso2
        name
        rate
        appliesTo {
          zipCode
          zipCodeRange {
            from
            to
          }
          entireCountry
          state
        }
      }
    }
  }
`;

export const TAX_FOR_SELECT = gql`
  query GetTaxesSelectSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    taxSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CREATE_TAX = gql`
  mutation CreateTax(
    $name: String!
    $rate: Int!
    $countries: [TaxedCountriesInput]
    ) {
    createTax(
      name: $name,
      rate: $rate
      countries: $countries
      ) {
      id
    }
  }
`;

export const UPDATE_TAX = gql`
  mutation UpdateTax(
    $id: Int!,
    $name: String!
    $rate: Int!
    $countries: [TaxedCountriesInput]
    ) {
    updateTax(
      id: $id,
      name: $name,
      rate: $rate
      countries: $countries
      ) {
      id
    }
  }
`;

export const DELETE_TAX = gql`
  mutation DeleteTax($id: Int!) {
    deleteTax(id: $id) {
      id
    }
  }
`;
