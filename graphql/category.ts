import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $parentId: Int
    $name: String!
    $description: String!
    $includeInMenu: Boolean!
    $position: Int!
    $thumbnail: [ImageInput]
    $urlKey: String!
    $metaTitle: String!
    $metaKeywords: String
    $metaDescription: String
    $metaRobots: String!
    $breadcrumbsPriority: Int
    $metaImage: [ImageInput]
    $language: LanguageInput!
  ) {
    createCategory(
      parentId: $parentId
      name: $name
      description: $description
      includeInMenu: $includeInMenu
      position: $position
      thumbnail: $thumbnail
      urlKey: $urlKey
      metaTitle: $metaTitle
      metaKeywords: $metaKeywords
      metaDescription: $metaDescription
      metaRobots: $metaRobots
      breadcrumbsPriority: $breadcrumbsPriority
      metaImage: $metaImage
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
    $urlKey: String!
    $metaTitle: String!
    $metaKeywords: String
    $metaDescription: String
    $metaRobots: String!
    $breadcrumbsPriority: Int
    $metaImage: [ImageInput]
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
      urlKey: $urlKey
      metaTitle: $metaTitle
      metaKeywords: $metaKeywords
      metaDescription: $metaDescription
      metaRobots: $metaRobots
      breadcrumbsPriority: $breadcrumbsPriority
      metaImage: $metaImage
      language: $language
    ) {
      id
      etag {
        categoryEtag
      }
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
    $etag: String!
  ) {
    categoryCount(etag: $etag) {
      count
    }
    categories(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
      language: $language
      etag: $etag
    ) {
      id
      parentId
      name
      translated {
        name
      }
      includeInMenu
      level
      position
      children {
        id
        parentId
        name
        translated {
          name
        }
        includeInMenu
        level
        position
        children {
          id
          parentId
          name
          translated {
            name
          }
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
  query Category($id: Int!, $language: LanguageInput!, $etag: String!) {
    category(id: $id, language: $language, etag: $etag) {
      id
      parentId
      parent {
        id
      }
      name
      description
      includeInMenu
      position
      translated {
        name
        description
        metaTitle
        metaKeywords
        metaDescription
      }
      thumbnail {
        id
        image
        placeholder
      }
      hasChildren
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
`;

export const CATEGORIES_FOR_SELECT = gql`
  query CategoriesSelect(
    $id: Int
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $language: LanguageInput!
    $etag: String!
  ) {
    categorySelect(
      id: $id
      page: $page
      limit: $limit
      orderBy: $orderBy
      language: $language
      etag: $etag
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
    $etag: String!
  ) {
    categorySelectAll(
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
      urlKey
    }
  }
`;
