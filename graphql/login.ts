import { gql } from '@apollo/client';

export const STAFF_LOGIN = gql`
  mutation StaffLogin(
    $email: String!
    $password: String!
    $rememberMe: Boolean!
  ) {
    staffLogin(email: $email, password: $password, rememberMe: $rememberMe) {
      success
    }
  }
`;
