import { gql } from '@apollo/client';

export const ORDER = gql`
  query Order($orderId: String!, $etag: String!) {
    order(orderId: $orderId, etag: $etag) {
      id
      orderNumber
      totalQuantity
      grandTotalInclTax
      grandTotalExclTax
      subTotalInclTax
      subTotalExclTax
      discountAmount
      orderApprovedAt
      payment {
        code
        data
      }
      orderGeo
      currency {
        code
      }
      coupon {
        id
        code
      }
      orderShipment {
        shipment {
          id
          name
        }
        totalWeight
        totalInclTax
        totalExclTax
      }
      tax {
        rate
      }
      orderStatus {
        id
        color
        label
      }
      paymentStatus {
        id
        color
        label
      }
      deliveryStatus {
        id
        color
        label
      }
      items {
        product {
          id
          name
          sku
          quantity
        }
        variantOption {
          id
          sku
          quantity
        }
        totalInclTax
        totalExclTax
        totalQuantity
      }
      createdAt
      customer {
        id
        fullName
        marketingOptIn
        registeredAt
        address {
          addressLine1
          phoneNumber
          email
          state
          postalCode
          city
          country {
            name
          }
        }
        registeredAt
      }
      createdAt
    }
  }
`;

export const STORE_INFO_ORDER = gql`
  query StoreInfoOrder($etag: String!) {
    storeInfoOrder(etag: $etag) {
      storeName
      storeEmail
      storeNumber
      addressLine1
      addressLine2
    }
  }
`;

export const ORDERS = gql`
  query Orders(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $etag: String!
  ) {
    orderCount(etag: $etag) {
      count
    }
    orders(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      etag: $etag
    ) {
      id
      orderNumber
      totalQuantity
      grandTotalInclTax
      grandTotalExclTax
      orderApprovedAt
      payment {
        code
        data
      }
      customer {
        fullName
        address {
          addressLine1
          state
          postalCode
          city
          country {
            name
          }
        }
      }
      orderStatus {
        id
        color
        label
      }
      paymentStatus {
        id
        color
        label
      }
      deliveryStatus {
        id
        color
        label
      }
      createdAt
    }
  }
`;

export const RECENT_ORDERS = gql`
  query RecentOrders($etag: String!) {
    recentOrders(etag: $etag) {
      id
      orderNumber
      totalQuantity
      grandTotalInclTax
      customer {
        fullName
        email
      }
      orderStatus {
        id
        color
        label
      }
      createdAt
    }
  }
`;

export const UPDATE_STATUS_ORDER = gql`
  mutation UpdateStatusOrder(
    $id: String!
    $orderStatus: OrderStatusInput!
    $paymentStatus: OrderStatusInput!
    $deliveryStatus: OrderStatusInput!
  ) {
    updateStatusOrder(
      id: $id
      orderStatus: $orderStatus
      paymentStatus: $paymentStatus
      deliveryStatus: $deliveryStatus
    ) {
      id
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteShippingZone($id: Int!) {
    deleteShippingZone(id: $id) {
      id
    }
  }
`;
