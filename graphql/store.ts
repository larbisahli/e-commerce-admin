import { gql } from '@apollo/client';

export const STORE_CONFIG = gql`
  query GetStoreAdminConfig($etag: String!) {
    getStoreAdminConfig(etag: $etag) {
      storeName
      storeEmail
      storeNumber
      systemCurrency {
        symbol
        code
        name
      }
      languages {
        id
        name
        localeId
        isDefault
        isSystem
      }
      published
      tier
      status
      createdAt
      maintenanceMode
      maintenancePassword
    }
    getStoreSubscription {
      id
      status
      cancel_at_period_end
      created
      current_period_start
      current_period_end
      ended_at
      cancel_at
      canceled_at
      trial_start
      trial_end
    }
  }
`;
