import { gql } from '@apollo/client';

export const ORDER = gql`
  query Order($orderId: String!) {
    order(orderId: $orderId) {
      id
      orderNumber
      totalQuantity
      grandTotalInclTax
      grandTotalExclTax
      subTotalInclTax
      subTotalExclTax
      discountAmount
      orderApprovedAt
      paymentCode
      orderGeo {
        ip
      }
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

export const ORDERS = gql`
  query Orders(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    orderCount {
      count
    }
    orders(page: $page, limit: $limit, orderBy: $orderBy, sortedBy: $sortedBy) {
      id
      orderNumber
      totalQuantity
      grandTotalInclTax
      grandTotalExclTax
      orderApprovedAt
      paymentCode
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
  query RecentOrders {
    recentOrders {
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
    $id: Int!
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

export const UPDATE_ORDER = gql`
  mutation UpdateShippingZone(
    $id: Int!
    $shippingZone: ShippingZoneInput
    $additions: UpdateRateAndZoneInput
    $deletions: UpdateRateAndZoneInput
  ) {
    updateShippingZone(
      id: $id
      shippingZone: $shippingZone
      additions: $additions
      deletions: $deletions
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
