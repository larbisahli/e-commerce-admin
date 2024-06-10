import { gql } from '@apollo/client';

export const DASH_ANALYTICS = gql`
  query GetDashAnalytics($dateId: String!) {
    getDashAnalytics(dateId: $dateId) {
      sales {
        date
        value
        quantity
      }
      orders {
        date
        value
        quantity
      }
      avgOrders {
        date
        value
        quantity
      }
      order {
        count
      }
      customer {
        count
      }
      product {
        count
      }
      category {
        count
      }
    }
  }
`;
