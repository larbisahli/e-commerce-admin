import { gql } from '@apollo/client';

export const CREATE_HERO_SLIDE = gql`
  mutation CreateHeroSlide(
    $destination_url: String
    $thumbnail: IMGInput!
    $title: String
    $description: String
    $btn_label: String
    $styles: HeroCarouselStyleInput
    $display_order: Int!
    $published: Boolean
  ) {
    createHeroSlide(
      destination_url: $destination_url
      thumbnail: $thumbnail
      title: $title
      description: $description
      btn_label: $btn_label
      styles: $styles
      display_order: $display_order
      published: $published
    ) {
      id
    }
  }
`;

export const UPDATE_HERO_SLIDE = gql`
  mutation UpdateHeroSlide(
    $id: ID!
    $destination_url: String
    $thumbnail: IMGInput!
    $title: String
    $description: String
    $btn_label: String
    $styles: HeroCarouselStyleInput
    $display_order: Int!
    $published: Boolean
  ) {
    updateHeroSlide(
      id: $id
      destination_url: $destination_url
      thumbnail: $thumbnail
      title: $title
      description: $description
      btn_label: $btn_label
      styles: $styles
      display_order: $display_order
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
      display_order
      published
      clicks
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
      }
      updated_by {
        id
        first_name
        last_name
      }
    }
  }
`;

export const HERO_SLIDE = gql`
  query HeroSlide($id: ID!) {
    heroSlide(id: $id) {
      id
      destination_url
      thumbnail
      title
      description
      btn_label
      styles
      display_order
      published
      clicks
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile {
          image
          placeholder
        }
      }
      updated_by {
        id
        first_name
        last_name
        profile {
          image
          placeholder
        }
      }
    }
  }
`;
