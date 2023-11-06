import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $password: String!
    $reCaptchaToken: String!
    $token: String!
  ) {
    resetPassword(
      password: $password
      reCaptchaToken: $reCaptchaToken
      token: $token
    ) {
      success
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email) {
      success
    }
  }
`;
