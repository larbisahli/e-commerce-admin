import { gql } from '@apollo/client';

export const SETTINGS = gql`
  query GetSettings {
    getSettings {
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
      currency {
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
        isEnable
        tagManagerId
      }
      facebook {
        isEnable
        AppId
        pageId
      }
    }
  }
`;

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings(
    $favicon: [ImageInput]
    $logo: [ImageInput]
    $storeName: String
    $storeEmail: String
    $storeNumber: String
    $currency: CurrencyInput
    $canonicalUrl: String
    $socials: [SocialInput]
    $maxCheckoutQuantity: Int
    $seo: SettingsSeoInput
    $google: GoogleSettingsInput
    $facebook: FacebookSettingsInput
  ) {
    updateSettings(
      favicon: $favicon
      logo: $logo
      storeName: $storeName
      storeEmail: $storeEmail
      storeNumber: $storeNumber
      currency: $currency
      canonicalUrl: $canonicalUrl
      socials: $socials
      maxCheckoutQuantity: $maxCheckoutQuantity
      seo: $seo
      google: $google
      facebook: $facebook
    ) {
      id
    }
  }
`;
