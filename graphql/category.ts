import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $parent_id: ID
    $category_name: String!
    $category_description: String!
    $icon: String!
    $thumbnail: IMGInput!
  ) {
    createCategory(
      parent_id: $parent_id
      category_name: $category_name
      category_description: $category_description
      icon: $icon
      thumbnail: $thumbnail
    ) {
      id
      category_name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $parent_id: ID
    $category_name: String!
    $category_description: String
    $icon: String!
    $thumbnail: IMGInput!
  ) {
    updateCategory(
      id: $id
      parent_id: $parent_id
      category_name: $category_name
      category_description: $category_description
      icon: $icon
      thumbnail: $thumbnail
    ) {
      id
      category_name
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
    categoriesCount {
      count
    }
    categoriesForAdmin(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      parent_id
      category_name
      category_description
      icon
      children {
        id
        parent_id
        category_name
        category_description
        icon
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

export const CATEGORY = gql`
  query Category($id: ID!) {
    categoryForAdmin(id: $id) {
      id
      parent_id
      parent {
        id
        category_name
      }
      category_name
      category_description
      icon
      thumbnail {
        image
        placeholder
      }
      has_children
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile_img
      }
      updated_by {
        id
        first_name
        last_name
        profile_img
      }
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
    categoriesSelectForAdmin(
      id: $id
      page: $page
      limit: $limit
      orderBy: $orderBy
    ) {
      id
      category_name
    }
  }
`;

export const CATEGORIES_FOR_SELECT_ALL = gql`
  query CategoriesSelectAll($page: Int!, $limit: Int!, $orderBy: String!) {
    categoriesSelectAllForAdmin(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      category_name
    }
  }
`;
