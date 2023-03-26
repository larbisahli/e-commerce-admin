import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation Login($alias: String!, $email: String!, $password: String!) {
    login(alias: $alias, email: $email, password: $password) {
      success
    }
  }
`;
