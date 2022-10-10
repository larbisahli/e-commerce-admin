import { gql } from '@apollo/client';

export const STAFF_LOGIN = gql`
  mutation Login(
    $aliasName: String!
    $phoneNumber: String!
    $password: String!
  ) {
    login(
      aliasName: $aliasName,
      phoneNumber: $phoneNumber,
      password: $password
      ) {
      success
    }
  }
`;
