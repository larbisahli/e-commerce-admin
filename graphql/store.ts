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
    }
  }
`;
