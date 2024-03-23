import { gql } from '@apollo/client';

export const DASH_ANALYTICS = gql`
  query GetDashAnalytics($dateId: String!) {
    getDashAnalytics(dateId: $dateId) {
      sales {
        total
        data
      }
      orders {
        total
        data
      }
      avgOrderValue {
        total
        data
      }
      revenue {
        total
        data
      }
    }
  }
`;
