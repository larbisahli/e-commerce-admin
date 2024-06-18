import { gql } from '@apollo/client';

export const THEMES = gql`
  query Themes($etag: String!) {
    themes(etag: $etag) {
      id
      title
      themePath
      description
      previewImage
      reviewsCount
      ratingStarCount
      price
      isFree
      version
      updatedAt
    }
  }
`;

export const STORE_THEMES = gql`
  query StoreThemes($etag: String!) {
    storeThemes(etag: $etag) {
      id
      title
      themePath
      description
      previewImage
      reviewsCount
      isDefault
      ratingStarCount
      version
    }
  }
`;

export const THEME = gql`
  query Theme($id: ID!, $etag: String!) {
    theme(id: $id, etag: $etag) {
      id
      title
      themePath
      description
      previewImage
      reviewsCount
      ratingStarCount
      price
      isFree
      version
      installed
      updatedAt
    }
  }
`;

export const ADD_STORE_THEME = gql`
  mutation AddStoreTheme($id: ID!) {
    addStoreTheme(id: $id) {
      id
    }
  }
`;
