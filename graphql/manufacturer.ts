import { gql } from '@apollo/client';

export const MANUFACTURER = gql`
  query Manufacturer($id: Int!, $language: LanguageInput!) {
    manufacturer(id: $id, language: $language) {
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
  ) {
    manufacturerCount {
      count
    }
    manufacturers(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
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
  ) {
    manufacturersForSelect(
      page: $page
      limit: $limit
      orderBy: $orderBy
      language: $language
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
