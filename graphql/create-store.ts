import { gql } from '@apollo/client';

export const CREATE_STORE = gql`
  mutation CreateStore(
    $firstName: String!
    $lastName: String!
    $email: String!
    $storeName: String!
    $alias: String!
    $country: CountryInput!
  ) {
    createStore(
      firstName: $firstName
      lastName: $lastName
      email: $email
      storeName: $storeName
      alias: $alias
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
