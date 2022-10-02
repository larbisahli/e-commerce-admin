import { gql } from '@apollo/client';

export const CREATE_STORE = gql`
  mutation CreateStore(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $number: String!
    $store_name: String!
    $dial_code: String!
    $country: String!
    $currency: CurrencyInput!
  ) {
    createStore(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      number: $number
      store_name: $store_name
      dial_code: $dial_code
      country: $country
      currency: $currency
    ) {
      store_name
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
