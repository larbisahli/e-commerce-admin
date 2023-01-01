import { gql } from '@apollo/client';

export const COUPONS = gql`
  query Coupons(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    couponCount {
      count
    }
    coupons(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      code
      orderAmountLimit
      discountValue
      discountType
      timesUsed
      maxUsage
      couponEndDate
      couponStartDate
      createdAt
      updatedAt
      createdBy {
        id
        firstName
        lastName
      }
      updatedBy {
        id
        firstName
        lastName
      }
    }
  }
`;

export const COUPON = gql`
  query Coupon($id: Int!) {
    coupon(id: $id) {
      id
      code
      orderAmountLimit
      discountValue
      discountType
      timesUsed
      maxUsage
      couponEndDate
      couponStartDate
    }
  }
`;

export const CREATE_COUPON = gql`
  mutation CreateCoupon(
    $code: String!
    $orderAmountLimit: Int!
    $discountValue: Int!
    $discountType: String!
    $maxUsage: Int
    $couponEndDate: String!
    $couponStartDate: String!
  ) {
    createCoupon(
      code: $code
      orderAmountLimit: $orderAmountLimit
      discountValue: $discountValue
      discountType: $discountType
      maxUsage: $maxUsage
      couponEndDate: $couponEndDate
      couponStartDate: $couponStartDate
    ) {
      id
      code
    }
  }
`;

export const UPDATE_COUPON = gql`
  mutation UpdateCoupon(
    $id: Int!
    $code: String!
    $orderAmountLimit: Int!
    $discountValue: Int!
    $discountType: String!
    $maxUsage: Int
    $couponEndDate: String!
    $couponStartDate: String!
  ) {
    updateCoupon(
      id: $id
      code: $code
      orderAmountLimit: $orderAmountLimit
      discountValue: $discountValue
      discountType: $discountType
      maxUsage: $maxUsage
      couponEndDate: $couponEndDate
      couponStartDate: $couponStartDate
    ) {
      id
      code
    }
  }
`;

export const DELETE_COUPON = gql`
  mutation DeleteCoupon($id: Int!) {
    deleteCoupon(id: $id) {
      id
      code
    }
  }
`;
