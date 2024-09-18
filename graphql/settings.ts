import { gql } from '@apollo/client';

export const STORE_SETTINGS = gql`
  query GetStoreSettings($etag: String!) {
    getStoreSettings(etag: $etag) {
      id
      favicon {
        id
        image
        placeholder
      }
      logo {
        id
        image
        placeholder
      }
      storeName
      storeEmail
      storeNumber
      addressLine1
      addressLine2
      currencies {
        symbol
        code
        name
        is_default
      }
      systemCurrency {
        symbol
        code
        name
      }
      defaultCurrency {
        symbol
        code
        name
      }
      canonicalUrl
      maxCheckoutQuantity
      maxCheckoutAmount
      maintenanceMode
      maintenancePassword
      seo {
        metaTitle
        metaDescription
        ogTitle
        ogDescription
        ogImage {
          id
          image
          placeholder
        }
        twitterHandle
        twitterCardType
        metaTags
        canonicalUrl
      }
      google {
        isEnabled
        trackingId
        isTrackVisitors
        isTrackOrders
        isTrackUserRegister
        isTrackUserLogin
        isTrackCheckoutOptions
        isTrackProductAddToCart
        isTrackProductRemoveToCart
        isTrackCheckout
      }
      facebook {
        isEnabled
        AppId
        pageId
      }
      webmanifest {
        name
        short_name
        description
        theme_color
        background_color
        start_url
        orientation {
          name
        }
        display {
          name
        }
        iarc_rating_id
        scope
      }
      tax {
        id
        name
      }
    }
  }
`;

export const UPDATE_STORE_SETTINGS = gql`
  mutation UpdateStoreSettings(
    $favicon: [ImageInput]
    $logo: [ImageInput]
    $storeName: String
    $storeEmail: String
    $storeNumber: String
    $addressLine1: String
    $addressLine2: String
    $currencies: [CurrencyInput!]!
    $defaultCurrency: CurrencyInput!
    $canonicalUrl: String
    $maxCheckoutQuantity: Int
    $maxCheckoutAmount: Int
    $seo: StoreSettingsSeoInput
    $google: GoogleSettingsInput
    $facebook: FacebookSettingsInput
    $webmanifest: WebmanifestInput
    $maintenanceMode: Boolean
    $maintenancePassword: Int
    $tax: TaxInput
  ) {
    updateStoreSettings(
      favicon: $favicon
      logo: $logo
      storeName: $storeName
      storeEmail: $storeEmail
      storeNumber: $storeNumber
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      currencies: $currencies
      defaultCurrency: $defaultCurrency
      canonicalUrl: $canonicalUrl
      maxCheckoutQuantity: $maxCheckoutQuantity
      maxCheckoutAmount: $maxCheckoutAmount
      seo: $seo
      google: $google
      facebook: $facebook
      webmanifest: $webmanifest
      maintenanceMode: $maintenanceMode
      maintenancePassword: $maintenancePassword
      tax: $tax
    ) {
      id
      etag {
        configEtag
      }
    }
  }
`;

export const UPDATE_CHECKOUT_SETTINGS = gql`
  mutation UpdateCheckoutSettings($fields: [JSONObject!]) {
    updateCheckoutSettings(fields: $fields) {
      success
      etag {
        configEtag
      }
    }
  }
`;

export const GET_CHECKOUT_SETTINGS = gql`
  query GetCheckoutSettings($etag: String!) {
    getCheckoutSettings(etag: $etag) {
      fields
    }
  }
`;
