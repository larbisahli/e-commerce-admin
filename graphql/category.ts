import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $parentId: ID
    $name: String!
    $description: String!
    $icon: String!
    $thumbnail: [ImageInput!]
  ) {
    createCategory(
      parentId: $parentId
      name: $name
      description: $description
      icon: $icon
      thumbnail: $thumbnail
    ) {
      id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $parentId: Int
    $name: String!
    $description: String
    $icon: String!
    $thumbnail: [ImageInput!]
  ) {
    updateCategory(
      id: $id
      parentId: $parentId
      name: $name
      description: $description
      icon: $icon
      thumbnail: $thumbnail
    ) {
      id
      name
    }
  }
`;

export const CATEGORIES = gql`
  query Categories(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    getCategoriesCount {
      count
    }
    getCategories(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      parentId
      name
      description
      icon
      children {
        id
        parentId
        name
        description
        icon
        createdAt
        updatedAt
        createdBy {
          id
          firstName
          lastName
          profile {
            image
            placeholder
          }
        }
        updatedBy {
          id
          firstName
          lastName
          profile {
            image
            placeholder
          }
        }
      }
      createdAt
      updatedAt
      createdBy {
        id
        firstName
        lastName
        profile {
          image
          placeholder
        }
      }
      updatedBy {
        id
        firstName
        lastName
        profile {
          image
          placeholder
        }
      }
    }
  }
`;

export const CATEGORY = gql`
  query Category($id: ID!) {
    getCategory(id: $id) {
      id
      parentId
      parent {
        id
        name
      }
      name
      description
      icon
      thumbnail {
        id
        image
        placeholder
      }
      hasChildren
    }
  }
`;

export const CATEGORIES_FOR_SELECT = gql`
  query CategoriesSelect(
    $id: ID
    $page: Int!
    $limit: Int!
    $orderBy: String!
  ) {
    getCategoriesSelect(
      id: $id
      page: $page
      limit: $limit
      orderBy: $orderBy
    ) {
      id
      name
    }
  }
`;

export const CATEGORIES_FOR_SELECT_ALL = gql`
  query CategoriesSelectAll($page: Int!, $limit: Int!, $orderBy: String!) {
    getCategoriesSelectAll(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;
