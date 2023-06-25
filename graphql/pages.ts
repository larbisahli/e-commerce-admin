import { gql } from '@apollo/client';

export const UPDATE_PAGE = gql`
  mutation updatePage(
    $slug: String!
    $name: String
    $content: String
    $ogImageId: [ImageInput]
    $seo: PageSeoInput
  ) {
    updatePage(
      slug: $slug
      name: $name
      content: $content
      ogImageId: $ogImageId
      seo: $seo
    ) {
      slug
    }
  }
`;

export const GET_PAGE = gql`
  query GetPage($slug: String!) {
    getPage(slug: $slug) {
      id
      slug
      name
      content
      ogImageId {
        id
        placeholder
        image
      }
      seo {
        metaTitle
        metaDescription
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
