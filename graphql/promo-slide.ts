import { gql } from '@apollo/client';

export const UPDATE_PROMO_SLIDE = gql`
  mutation UpdatePromoSlide(
    $id: Int
    $animationSpeed: Int
    $delaySpeed: Int
    $backgroundColor: String
    $direction: String
    $published: Boolean!
    $sliders: [PromoSliderInput]
    $language: LanguageInput!
  ) {
    updatePromoSlide(
      id: $id
      animationSpeed: $animationSpeed
      delaySpeed: $delaySpeed
      backgroundColor: $backgroundColor
      direction: $direction
      published: $published
      sliders: $sliders
      language: $language
    ) {
      id
    }
  }
`;

export const PROMO_SLIDER = gql`
  query PromoSlide($language: LanguageInput!, $etag: String!) {
    promoSlide(language: $language, etag: $etag) {
      id
      animationSpeed
      delaySpeed
      backgroundColor
      published
      direction
      sliders {
        content
        position
      }
      translated {
        direction
        sliders {
          content
          position
        }
      }
      updatedAt
      updatedBy {
        id
        firstName
        lastName
      }
    }
  }
`;
