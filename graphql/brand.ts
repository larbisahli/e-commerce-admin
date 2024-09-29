import { gql } from '@apollo/client';

export const BRAND = gql`
  query Brand($id: Int!, $language: LanguageInput!, $etag: String!) {
    brand(id: $id, language: $language, etag: $etag) {
      id
      name
      description
      link
      translated {
        name
        description
      }
      logo {
        id
        image
        placeholder
      }
    }
  }
`;

export const BRANDS = gql`
  query Brands(
    $page: Int!
    $limit: Int!
    $orderBy: String
    $sortedBy: String
    $language: LanguageInput!
    $etag: String!
  ) {
    brandCount(etag: $etag) {
      count
    }
    brands(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      etag: $etag
    ) {
      id
      name
      link
      translated {
        name
      }
      logo {
        id
        image
        placeholder
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

export const BRANDS_FOR_SELECT = gql`
  query BrandsForSelect(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $language: LanguageInput!
    $etag: String!
  ) {
    brandsForSelect(
      page: $page
      limit: $limit
      orderBy: $orderBy
      language: $language
      etag: $etag
    ) {
      id
      name
      translated {
        name
      }
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand(
    $name: String!
    $link: String
    $description: String
    $language: LanguageInput!
    $logo: [ImageInput]
  ) {
    createBrand(
      name: $name
      link: $link
      description: $description
      logo: $logo
      language: $language
    ) {
      id
      etag {
        brandEtag
      }
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand(
    $id: Int!
    $name: String!
    $link: String
    $description: String
    $language: LanguageInput!
    $logo: [ImageInput]
  ) {
    updateBrand(
      id: $id
      name: $name
      link: $link
      description: $description
      language: $language
      logo: $logo
    ) {
      id
      etag {
        brandEtag
      }
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($id: Int!) {
    deleteBrand(id: $id) {
      id
      etag {
        brandEtag
      }
    }
  }
`;
