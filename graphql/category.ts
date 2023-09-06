import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $parentId: Int
    $name: String!
    $description: String!
    $includeInMenu: Boolean!
    $position: Int!
    $thumbnail: [ImageInput]
    $categorySeo: CategorySeoInput!
    $language: LanguageInput!
  ) {
    createCategory(
      parentId: $parentId
      name: $name
      description: $description
      includeInMenu: $includeInMenu
      position: $position
      thumbnail: $thumbnail
      categorySeo: $categorySeo
      language: $language
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
    $includeInMenu: Boolean!
    $position: Int!
    $thumbnail: [ImageInput]
    $categorySeo: CategorySeoInput!
    $language: LanguageInput!
  ) {
    updateCategory(
      id: $id
      parentId: $parentId
      name: $name
      description: $description
      includeInMenu: $includeInMenu
      position: $position
      thumbnail: $thumbnail
      categorySeo: $categorySeo
      language: $language
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
    $language: LanguageInput!
    $defaultLanguage: LanguageInput!
  ) {
    categoryCount {
      count
    }
    categories(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      defaultLanguage: $defaultLanguage
    ) {
      id
      parentId
      name
      description
      includeInMenu
      level
      position
      children {
        id
        parentId
        name
        description
        includeInMenu
        level
        position
        children {
          id
          parentId
          name
          description
          includeInMenu
          level
          position
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
  query Category(
    $id: Int!
    $language: LanguageInput!
    $defaultLanguage: LanguageInput!
  ) {
    category(id: $id, language: $language, defaultLanguage: $defaultLanguage) {
      id
      parentId
      parent {
        id
        name
      }
      name
      description
      includeInMenu
      position
      thumbnail {
        id
        image
        placeholder
      }
      hasChildren
      categorySeo {
        urlKey
        metaTitle
        metaKeywords
        metaDescription
        metaRobots
        breadcrumbsPriority
        metaImage {
          id
          image
          placeholder
        }
      }
    }
  }
`;

export const CATEGORIES_FOR_SELECT = gql`
  query CategoriesSelect(
    $id: Int
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $language: LanguageInput!
  ) {
    categorySelect(
      id: $id
      page: $page
      limit: $limit
      orderBy: $orderBy
      language: $language
    ) {
      id
      name
    }
  }
`;

export const CATEGORIES_FOR_SELECT_ALL = gql`
  query CategorySelectAll(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $language: LanguageInput!
  ) {
    categorySelectAll(
      page: $page
      limit: $limit
      orderBy: $orderBy
      language: $language
    ) {
      id
      name
    }
  }
`;
