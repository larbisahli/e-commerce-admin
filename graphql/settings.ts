import { gql } from '@apollo/client';

export const STORE_SETTINGS = gql`
  query GetStoreSettings {
    getStoreSettings {
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
      canonicalUrl
      socials {
        url
        icon {
          value
          label
        }
      }
      maxCheckoutQuantity
      maxCheckoutAmount
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
    $currencies: [CurrencyInput]!
    $canonicalUrl: String
    $socials: [SocialInput]
    $maxCheckoutQuantity: Int
    $maxCheckoutAmount: Int
    $seo: StoreSettingsSeoInput
    $google: GoogleSettingsInput
    $facebook: FacebookSettingsInput
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
      canonicalUrl: $canonicalUrl
      socials: $socials
      maxCheckoutQuantity: $maxCheckoutQuantity
      maxCheckoutAmount: $maxCheckoutAmount
      seo: $seo
      google: $google
      facebook: $facebook
    ) {
      id
    }
  }
`;
