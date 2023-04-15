import { gql } from '@apollo/client';

export const CREATE_HERO_SLIDE = gql`
  mutation CreateHeroSlide(
    $destinationUrl: String
    $thumbnail: [ImageInput!]!
    $title: String
    $description: String
    $btnLabel: String
    $styles: HeroBannerStyleInput!
    $position: Int!
    $published: Boolean!
  ) {
    createHeroSlide(
      destinationUrl: $destinationUrl
      thumbnail: $thumbnail
      title: $title
      description: $description
      btnLabel: $btnLabel
      styles: $styles
      position: $position
      published: $published
    ) {
      id
    }
  }
`;

export const UPDATE_HERO_SLIDE = gql`
  mutation UpdateHeroSlide(
    $id: Int!
    $destinationUrl: String
    $thumbnail: [ImageInput!]!
    $title: String
    $description: String
    $btnLabel: String
    $styles: HeroBannerStyleInput!
    $position: Int!
    $published: Boolean!
  ) {
    updateHeroSlide(
      id: $id
      destinationUrl: $destinationUrl
      thumbnail: $thumbnail
      title: $title
      description: $description
      btnLabel: $btnLabel
      styles: $styles
      position: $position
      published: $published
    ) {
      id
    }
  }
`;

export const DELETE_HERO_SLIDE = gql`
  mutation DeleteHeroSlide($id: Int!) {
    deleteHeroSlide(id: $id) {
      id
    }
  }
`;

export const HERO_CAROUSEL_LIST = gql`
  query HeroCarouselList($page: Int!, $limit: Int!) {
    heroSlideListCount {
      count
    }
    heroSlideList(page: $page, limit: $limit) {
      id
      thumbnail {
        image
        placeholder
      }
      title
      position
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
  query HeroSlide($id: Int!) {
    heroSlide(id: $id) {
      id
      destinationUrl
      thumbnail {
        id
        image
        placeholder
      }
      title
      description
      btnLabel
      styles {
        align
        textColor
        btnBgc
        btnTextColor
      }
      position
      published
    }
  }
`;
