import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $parentId: Int
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
    $id: Int!
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
    categoryCount {
      count
    }
    categories(
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
        }
        updatedBy {
          id
          firstName
          lastName
        }
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

export const CATEGORY = gql`
  query Category($id: Int!) {
    category(id: $id) {
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
    $id: Int
    $page: Int!
    $limit: Int!
    $orderBy: String!
  ) {
    categorySelect(id: $id, page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CATEGORIES_FOR_SELECT_ALL = gql`
  query CategorySelectAll($page: Int!, $limit: Int!, $orderBy: String!) {
    categorySelectAll(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      name
    }
  }
`;
