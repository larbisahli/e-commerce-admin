import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query Products(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    productCount {
      count
    }
    products(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      sku
      name
      salePrice
      maxPrice
      minPrice
      type {
        id
      }
      quantity
      published
      categories {
        id
        name
      }
      thumbnail {
        id
        image
        placeholder
      }
      createdAt
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

export const PRODUCT = gql`
  query Product($id: Int!) {
    product(id: $id) {
      id
      name
      sku
      salePrice
      comparePrice
      buyingPrice
      quantity
      description
      type {
        id
      }
      published
      disableOutOfStock
      note
      thumbnail {
        id
        image
        placeholder
      }
      gallery {
        id
        image
        placeholder
      }
      categories {
        id
        name
      }
      suppliers {
        id
        name
      }
      tags {
        id
        name
      }
      variationOptions {
        id
        title
        isDisable
        thumbnail {
          id
          image
          placeholder
        }
        options
        salePrice
        comparePrice
        buyingPrice
        quantity
        sku
      }
      variations {
        attribute {
          id
          name
        }
        selectedValues {
          id
          value
        }
      }
      productShippingInfo {
        id
        weight
        weightUnit {
          unit
        }
        volume
        volumeUnit {
          unit
        }
        dimensionWidth
        dimensionHeight
        dimensionDepth
        dimensionUnit {
          unit
        }
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $salePrice: Float!
    $comparePrice: Float
    $buyingPrice: Float
    $quantity: Int!
    $description: String!
    $type: ProductTypeInput!
    $published: Boolean!
    $disableOutOfStock: Boolean!
    $note: String
    $sku: String
    $thumbnail: [ImageInput!]!
    $gallery: [ImageInput!]!
    $categories: [CategoryInput!]!
    $suppliers: [SupplierInput]
    $tags: [TagInput]
    $variationOptions: [VariationOptionInput]
    $variations: [VariationInput]
    $productShippingInfo: ProductShippingInfoInput
    $productSeo: ProductSeoInput!
    $relatedProducts: [ProductInput]
    $upsellProducts: [ProductInput]
    $crossSellProducts: [ProductInput]
  ) {
    createProduct(
      name: $name
      salePrice: $salePrice
      comparePrice: $comparePrice
      buyingPrice: $buyingPrice
      quantity: $quantity
      description: $description
      type: $type
      published: $published
      disableOutOfStock: $disableOutOfStock
      note: $note
      sku: $sku
      thumbnail: $thumbnail
      gallery: $gallery
      categories: $categories
      suppliers: $suppliers
      tags: $tags
      variationOptions: $variationOptions
      variations: $variations
      productShippingInfo: $productShippingInfo
      productSeo: $productSeo
      relatedProducts: $relatedProducts
      upsellProducts: $upsellProducts
      crossSellProducts: $crossSellProducts
    ) {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $additions: UpdateProductInput!
    $deletions: UpdateProductInput!
  ) {
    updateProduct(id: $id, additions: $additions, deletions: $deletions) {
      id
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      name
    }
  }
`;
