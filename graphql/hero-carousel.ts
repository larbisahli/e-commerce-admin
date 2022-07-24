import { gql } from '@apollo/client';

export const CREATE_HERO_SLIDE = gql`
  mutation CreateHeroSlide(
    $destinationUrl: String
    $thumbnail: IMGInput!
    $title: String
    $description: String
    $btnLabel: String
    $styles: HeroBannerStyleInput
    $displayOrder: Int!
    $published: Boolean
  ) {
    createHeroSlide(
      destinationUrl: $destinationUrl
      thumbnail: $thumbnail
      title: $title
      description: $description
      btnLabel: $btnLabel
      styles: $styles
      displayOrder: $displayOrder
      published: $published
    ) {
      id
    }
  }
`;

export const UPDATE_HERO_SLIDE = gql`
  mutation UpdateHeroSlide(
    $id: ID!
    $destinationUrl: String
    $thumbnail: IMGInput!
    $title: String
    $description: String
    $btnLabel: String
    $styles: HeroBannerStyleInput
    $displayOrder: Int!
    $published: Boolean
  ) {
    updateHeroSlide(
      id: $id
      destinationUrl: $destinationUrl
      thumbnail: $thumbnail
      title: $title
      description: $description
      btnLabel: $btnLabel
      styles: $styles
      displayOrder: $displayOrder
      published: $published
    ) {
      id
    }
  }
`;

export const DELETE_HERO_SLIDE = gql`
  mutation DeleteHeroSlide($id: ID!) {
    deleteHeroSlide(id: $id) {
      id
    }
  }
`;

export const HERO_CAROUSEL_LIST = gql`
  query HeroCarouselList($page: Int!, $limit: Int!) {
    heroCarouselListCount {
      count
    }
    heroCarouselListForAdmin(page: $page, limit: $limit) {
      id
      thumbnail {
        image
        placeholder
      }
      title
      displayOrder
      published
      clicks
      createdAt
      updatedAt
      createdBy {
        id
        firstName
        lastName
      }
      updatedBy {
        id
        firstName
        lastName
      }
    }
  }
`;

export const HERO_SLIDE = gql`
  query HeroSlide($id: ID!) {
    heroSlide(id: $id) {
      id
      destinationUrl
      thumbnail {
        image
        placeholder
      }
      title
      description
      btnLabel
      styles {
        text_color
        btnBgc
        btn_text_color
      }
      displayOrder
      published
      clicks
      createdAt
      updatedAt
      createdBy {
        id
        firstName
        lastName
        profile {
          image
          placeholder
        }
      }
      updatedBy {
        id
        firstName
        lastName
        profile {
          image
          placeholder
        }
      }
    }
  }
`;
