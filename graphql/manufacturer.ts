import { gql } from '@apollo/client';

export const MANUFACTURER = gql`
  query Manufacturer($id: Int!, $language: LanguageInput!, $etag: String!) {
    manufacturer(id: $id, language: $language, etag: $etag) {
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

export const MANUFACTURERS = gql`
  query Manufacturers(
    $page: Int!
    $limit: Int!
    $orderBy: String
    $sortedBy: String
    $language: LanguageInput!
    $etag: String!
  ) {
    manufacturerCount(etag: $etag) {
      count
    }
    manufacturers(
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

export const MANUFACTURERS_FOR_SELECT = gql`
  query ManufacturersForSelect(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $language: LanguageInput!
    $etag: String!
  ) {
    manufacturersForSelect(
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

export const CREATE_MANUFACTURER = gql`
  mutation CreateManufacturer(
    $name: String!
    $link: String
    $description: String
    $language: LanguageInput!
    $logo: [ImageInput]
  ) {
    createManufacturer(
      name: $name
      link: $link
      description: $description
      logo: $logo
      language: $language
    ) {
      id
    }
  }
`;

export const UPDATE_MANUFACTURER = gql`
  mutation UpdateManufacturer(
    $id: Int!
    $name: String!
    $link: String
    $description: String
    $language: LanguageInput!
    $logo: [ImageInput]
  ) {
    updateManufacturer(
      id: $id
      name: $name
      link: $link
      description: $description
      language: $language
      logo: $logo
    ) {
      id
      etag {
        manufacturerEtag
      }
    }
  }
`;

export const DELETE_MANUFACTURER = gql`
  mutation DeleteManufacturer($id: Int!) {
    deleteManufacturer(id: $id) {
      name
    }
  }
`;
