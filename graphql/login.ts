import { gql } from '@apollo/client';

export const STAFF_LOGIN = gql`
  mutation StaffLogin(
    $email: String!
    $password: String!
    $remember_me: Boolean!
  ) {
    staffLogin(email: $email, password: $password, remember_me: $remember_me) {
      success
    }
  }
`;
