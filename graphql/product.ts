import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query ProductPagination(
    $account_uid: ID!
    $category_uid: ID
    $page: Int!
    $limit: Int
  ) {
    products(
      account_uid: $account_uid
      category_uid: $category_uid
      page: $page
      limit: $limit
    ) {
      product_uid
      category_uid
      account_uid
      title
      price
      thumbnail {
        image_uid
        image
      }
    }
  }
`;

export const PRODUCT = gql`
  query getProduct($product_uid: ID!) {
    productsCount {
      count
    }
    product(product_uid: $product_uid) {
      product_uid
      category_uid
      account_uid
      title
      price
      discount
      warehouse_location
      product_description
      short_description
      inventory
      product_weight
      is_new
      note
      thumbnail {
        image_uid
        image
        display_order
      }
      gallery {
        image_uid
        image
        display_order
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $category_uid: ID!
    $account_uid: ID!
    $title: String!
    $price: Float!
    $discount: Float
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $inventory: Int!
    $product_weight: Float!
    $is_new: Boolean!
    $note: String
  ) {
    CreateProduct(
      category_uid: $category_uid
      account_uid: $account_uid
      title: $title
      price: $price
      discount: $discount
      warehouse_location: $warehouse_location
      product_description: $product_description
      short_description: $short_description
      inventory: $inventory
      product_weight: $product_weight
      is_new: $is_new
      note: $note
    ) {
      product_uid
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $product_uid: ID!
    $category_uid: ID!
    $title: String!
    $price: Float!
    $discount: Float
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $inventory: Int!
    $product_weight: Float!
    $is_new: Boolean!
    $note: String
  ) {
    UpdateProduct(
      product_uid: $product_uid
      category_uid: $category_uid
      title: $title
      price: $price
      discount: $discount
      warehouse_location: $warehouse_location
      product_description: $product_description
      short_description: $short_description
      inventory: $inventory
      product_weight: $product_weight
      is_new: $is_new
      note: $note
    ) {
      product_uid
    }
  }
`;

export const UPDATE_IMAGE_ORDER = gql`
  mutation UpdateImageOrder($image_uid: ID!, $display_order: Int!) {
    updateImageOrder(image_uid: $image_uid, display_order: $display_order) {
      display_order
    }
  }
`;
