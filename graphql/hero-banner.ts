import { gql } from '@apollo/client';

export const CREATE_HERO_SLIDE = gql`
  mutation CreateHeroSlide(
    $url: String
    $thumbnail: [ImageInput!]!
    $title: String
    $description: String
    $btnLabel: String
    $styles: HeroSlideStyleInput!
    $position: Int!
    $align: AlignTypeEnum!
    $published: Boolean!
    $language: LanguageInput!
  ) {
    createHeroSlide(
      url: $url
      thumbnail: $thumbnail
      title: $title
      description: $description
      btnLabel: $btnLabel
      styles: $styles
      align: $align
      position: $position
      published: $published
      language: $language
    ) {
      id
    }
  }
`;

export const UPDATE_HERO_SLIDE = gql`
  mutation UpdateHeroSlide(
    $id: Int!
    $url: String
    $thumbnail: [ImageInput!]!
    $title: String
    $description: String
    $btnLabel: String
    $styles: HeroSlideStyleInput!
    $position: Int!
    $align: AlignTypeEnum!
    $published: Boolean!
    $language: LanguageInput!
  ) {
    updateHeroSlide(
      id: $id
      url: $url
      thumbnail: $thumbnail
      title: $title
      description: $description
      btnLabel: $btnLabel
      styles: $styles
      align: $align
      position: $position
      published: $published
      language: $language
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

export const HERO_BANNER_LIST = gql`
  query HeroBannerList($page: Int!, $limit: Int!, $language: LanguageInput!) {
    heroSlideListCount {
      count
    }
    heroSlideList(page: $page, limit: $limit, language: $language) {
      id
      thumbnail {
        image
        placeholder
      }
      title
      position
      published
      translated {
        title
      }
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
  query HeroSlide($id: Int!, $language: LanguageInput!) {
    heroSlide(id: $id, language: $language) {
      id
      url
      thumbnail {
        id
        image
        placeholder
      }
      title
      description
      align
      btnLabel
      translated {
        title
        description
        align
        btnLabel
      }
      styles {
        textColor
        btnBgc
        btnTextColor
      }
      position
      published
    }
  }
`;
