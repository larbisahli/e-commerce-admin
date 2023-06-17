import { gql } from '@apollo/client';

export const UPDATE_PROMO_SLIDE = gql`
  mutation UpdatePromoSlide(
    $id: Int
    $animationSpeed: String
    $backgroundColor: String
    $direction: String
    $published: Boolean!
    $sliders: [PromoSliderInput]
  ) {
    updatePromoSlide(
      id: $id
      animationSpeed: $animationSpeed
      backgroundColor: $backgroundColor
      direction: $direction
      published: $published
      sliders: $sliders
    ) {
      id
    }
  }
`;

export const PROMO_SLIDER = gql`
  query PromoSlide {
    promoSlide {
      id
      animationSpeed
      backgroundColor
      direction
      published
      sliders {
        text
        textColor
        position
        destinationUrl
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
