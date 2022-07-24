import { gql } from '@apollo/client';

export const COUPONS = gql`
  query CouponsForAdmin(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    couponsCount {
      count
    }
    couponsForAdmin(
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
  query CouponForAdmin($id: ID!) {
    couponForAdmin(id: $id) {
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
        profile {
          image
          placeholder
        }
      }
      updatedBy {
        id
        firstName
        lastName
        profile {
          image
          placeholder
        }
      }
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
    $id: ID!
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
  mutation DeleteCoupon($id: ID!) {
    deleteCoupon(id: $id) {
      id
      code
    }
  }
`;
