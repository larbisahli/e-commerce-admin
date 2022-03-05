import { gql } from '@apollo/client';

// Store Settings
export const STORE_SETTINGS = gql`
  query storeSettings($id: ID!) {
    storeSettings(id: $id) {
      id
      attribute_name
      attribute_values {
        id
        attribute_value
        color
      }
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile_img
      }
      updated_by {
        id
        first_name
        last_name
        profile_img
      }
    }
  }
`;

export const CREATE_STORE_SETTINGS = gql`
  mutation CreateStoreSettings(
    $contactDetails: ContactDetailsInput
    $currency: CurrencyInput!
    $favicon: String!
    $logo: String!
    $store_address: String
    $store_name: String!
  ) {
    createStoreSettings(
      contactDetails: $contactDetails
      currency: $currency
      favicon: $favicon
      logo: $logo
      store_address: $store_address
      store_name: $store_name
    ) {
      store_name
    }
  }
`;

export const UPDATE_STORE_SETTINGS = gql`
  mutation CreateStoreSettings(
    $contactDetails: [AttributeValueInput]
    $currency: [AttributeValueInput]
    $favicon: String!
    $logo: String!
    $store_address: String
    $store_name: String!
  ) {
    createStoreSettings(
      contactDetails: $contactDetails
      currency: $currency
      favicon: $favicon
      logo: $logo
      store_address: $store_address
      store_name: $store_name
    ) {
      store_name
    }
  }
`;
