import { gql } from '@apollo/client';

export const CREATE_STORE = gql`
  mutation CreateStore(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $storeName: String!
    $alias: String!
    $country: CountryInput!
    $currency: CurrencyInput!
    $acceptCondition: Boolean!
    $phoneNumber: String
    $token: String!
  ) {
    createStore(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      storeName: $storeName
      alias: $alias
      country: $country
      currency: $currency
      acceptCondition: $acceptCondition
      phoneNumber: $phoneNumber
      token: $token
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
