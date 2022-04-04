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
      order_amount_limit
      discount_value
      discount_type
      times_used
      max_usage
      coupon_end_date
      coupon_start_date
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
      }
      updated_by {
        id
        first_name
        last_name
      }
    }
  }
`;

export const COUPON = gql`
  query CouponForAdmin($id: ID!) {
    couponForAdmin(id: $id) {
      id
      code
      order_amount_limit
      discount_value
      discount_type
      times_used
      max_usage
      coupon_end_date
      coupon_start_date
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile {
          image
          placeholder
        }
      }
      updated_by {
        id
        first_name
        last_name
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
    $order_amount_limit: Int!
    $discount_value: Int!
    $discount_type: String!
    $max_usage: Int
    $coupon_end_date: String!
    $coupon_start_date: String!
  ) {
    createCoupon(
      code: $code
      order_amount_limit: $order_amount_limit
      discount_value: $discount_value
      discount_type: $discount_type
      max_usage: $max_usage
      coupon_end_date: $coupon_end_date
      coupon_start_date: $coupon_start_date
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
    $order_amount_limit: Int!
    $discount_value: Int!
    $discount_type: String!
    $max_usage: Int
    $coupon_end_date: String!
    $coupon_start_date: String!
  ) {
    updateCoupon(
      id: $id
      code: $code
      order_amount_limit: $order_amount_limit
      discount_value: $discount_value
      discount_type: $discount_type
      max_usage: $max_usage
      coupon_end_date: $coupon_end_date
      coupon_start_date: $coupon_start_date
    ) {
      id
      code
    }
  }
`;

export const DELETE_COUPON = gql`
  mutation DeleteTag($id: ID!) {
    deleteCoupon(id: $id) {
      id
      code
    }
  }
`;
