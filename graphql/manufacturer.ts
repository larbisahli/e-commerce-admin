import { gql } from '@apollo/client';

export const MANUFACTURER = gql`
  query Manufacturer($id: Int!) {
    manufacturer(id: $id) {
      id
      name
      website
      description
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
  ) {
    manufacturerCount {
      count
    }
    manufacturers(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      name
      website
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
  query ManufacturersForSelect($page: Int!, $limit: Int!, $orderBy: String!) {
    manufacturersForSelect(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CREATE_MANUFACTURER = gql`
  mutation CreateManufacturer(
    $name: String!
    $website: String
    $description: String
    $logo: [ImageInput]
  ) {
    createManufacturer(
      name: $name
      website: $website
      description: $description
      logo: $logo
    ) {
      name
    }
  }
`;

export const UPDATE_MANUFACTURER = gql`
  mutation UpdateManufacturer(
    $id: Int!
    $name: String!
    $website: String
    $description: String
    $logo: [ImageInput]
  ) {
    updateManufacturer(
      id: $id
      name: $name
      website: $website
      description: $description
      logo: $logo
    ) {
      name
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
