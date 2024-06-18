import { gql } from '@apollo/client';

export const UPDATE_PAGE = gql`
  mutation updatePage(
    $slug: String!
    $name: String
    $content: String
    $metaTitle: String
    $metaDescription: String
    $ogMedia: [ImageInput]
    $language: LanguageInput!
  ) {
    updatePage(
      slug: $slug
      name: $name
      content: $content
      metaTitle: $metaTitle
      metaDescription: $metaDescription
      ogMedia: $ogMedia
      language: $language
    ) {
      slug
    }
  }
`;

export const GET_PAGE = gql`
  query GetPage($slug: String!, $language: LanguageInput!, $etag: String!) {
    getPage(slug: $slug, language: $language, etag: $etag) {
      id
      slug
      name
      content
      metaTitle
      metaDescription
      translated {
        name
        content
        metaTitle
        metaDescription
      }
      ogMedia {
        id
        placeholder
        image
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
