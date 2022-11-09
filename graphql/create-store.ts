import { gql } from '@apollo/client';

export const CREATE_STORE = gql`
  mutation CreateStore(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $storeName: String!
    $aliasName: String!
    $country: CountryInput!
  ) {
    createStore(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      storeName: $storeName
      aliasName: $aliasName
      country: $country
    ) {
      storeName
    }
  }
`;

export const ALIAS_NAME_CHECK = gql`
  query AliasNameCheck($name: String!) {
    aliasCheck(name: $name) {
      exists
    }
  }
`;
