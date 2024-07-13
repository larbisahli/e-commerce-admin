import { gql } from '@apollo/client';

export const GET_PAYMENT = gql`
  query GetPayment($code: String!, $etag: String!) {
    getPayment(code: $code, etag: $etag) {
      code
      active
      data
    }
  }
`;

export const GET_OFFLINE_PAYMENTS = gql`
  query GetOfflinePayments($etag: String!) {
    getOfflinePayments(etag: $etag) {
      code
      active
    }
  }
`;

export const UPDATE_OFFLINE_PAYMENT = gql`
  mutation UpdateOfflinePayment($code: String!, $data: JSONObject!) {
    updateOfflinePayment(code: $code, data: $data) {
      code
      etag {
        paymentEtag
      }
    }
  }
`;

export const UPDATE_OFFLINE_PAYMENT_AVAILABILITY = gql`
  mutation UpdateOfflinePaymentAvailability($code: String!, $active: Boolean!) {
    updateOfflinePaymentAvailability(code: $code, active: $active) {
      code
      etag {
        paymentEtag
      }
    }
  }
`;
