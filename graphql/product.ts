import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query Products(
    $id: Int
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    productCount {
      count
    }
    products(
      id: $id
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

      productSeo {
        id
        slug
        metaTitle
        metaKeywords
        metaDescription
        metaImage {
          id
          image
          placeholder
        }
      }
    }
  }
`;

export const LINKED_PRODUCTS = gql`
  query Product($id: Int!) {
    relatedProducts(id: $id) {
      id
      sku
      name
      type {
        id
      }
      quantity
      published
      thumbnail {
        id
        image
        placeholder
      }
    }
    upsellProducts(id: $id) {
      id
      sku
      name
      type {
        id
      }
      quantity
      published
      thumbnail {
        id
        image
        placeholder
      }
    }
    crossSellProducts(id: $id) {
      id
      sku
      name
      type {
        id
      }
      quantity
      published
      thumbnail {
        id
        image
        placeholder
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
    $additions: ProductInput!
    $deletions: ProductInput!
  ) {
    updateProduct(id: $id, additions: $additions, deletions: $deletions) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_THUMBNAIL = gql`
  mutation UpdateProductThumbnail(
    $id: Int!
    $additions: ProductInput!
    $deletions: ProductInput!
  ) {
    updateProductThumbnail(
      id: $id
      additions: $additions
      deletions: $deletions
    ) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_GALLERY = gql`
  mutation UpdateProductGallery(
    $id: Int!
    $additions: ProductInput!
    $deletions: ProductInput!
  ) {
    updateProductGallery(
      id: $id
      additions: $additions
      deletions: $deletions
    ) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_CONTENT = gql`
  mutation UpdateProductContent(
    $id: Int!
    $name: String!
    $description: String!
    $note: String
    $published: Boolean!
    $disableOutOfStock: Boolean!
  ) {
    updateProductContent(
      id: $id
      name: $name
      note: $note
      description: $description
      published: $published
      disableOutOfStock: $disableOutOfStock
    ) {
      id
      name
      note
      description
      published
      disableOutOfStock
    }
  }
`;

export const UPDATE_SIMPLE_PRODUCT_INFORMATION = gql`
  mutation UpdateSimpleProductInformation(
    $id: Int!
    $salePrice: Float!
    $comparePrice: Float!
    $buyingPrice: Float
    $quantity: Int!
    $sku: String
  ) {
    updateSimpleProductInformation(
      id: $id
      salePrice: $salePrice
      comparePrice: $comparePrice
      buyingPrice: $buyingPrice
      quantity: $quantity
      sku: $sku
    ) {
      salePrice
      comparePrice
      buyingPrice
      quantity
      sku
    }
  }
`;

export const UPDATE_PRODUCT_SELECT_GROUP = gql`
  mutation UpdateProductSelectGroup(
    $id: Int!
    $additions: ProductInput
    $deletions: ProductInput
  ) {
    updateProductSelectGroup(
      id: $id
      additions: $additions
      deletions: $deletions
    ) {
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
    }
  }
`;

export const UPDATE_PRODUCT_SEO = gql`
  mutation UpdateProductSeo($id: Int!, $productSeo: ProductSeoInput!) {
    updateProductSeo(id: $id, productSeo: $productSeo) {
      id
      productSeo {
        id
        slug
        metaTitle
        metaKeywords
        metaDescription
        metaImage {
          id
          image
          placeholder
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT_SHIPPING_INFO = gql`
  mutation UpdateProductShippingInfo(
    $id: Int!
    $productShippingInfo: ProductShippingInfoInput!
  ) {
    updateProductShippingInfo(
      id: $id
      productShippingInfo: $productShippingInfo
    ) {
      id
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

export const UPDATE_LINKED_PRODUCTS = gql`
  mutation UpdateLinkedProducts(
    $id: Int!
    $additions: ProductInput!
    $deletions: ProductInput!
  ) {
    updateLinkedProducts(
      id: $id
      additions: $additions
      deletions: $deletions
    ) {
      id
      relatedProducts {
        id
        sku
        name
        type {
          id
        }
        quantity
        published
        thumbnail {
          id
          image
          placeholder
        }
      }
      upsellProducts {
        id
        sku
        name
        type {
          id
        }
        quantity
        published
        thumbnail {
          id
          image
          placeholder
        }
      }
      crossSellProducts {
        id
        sku
        name
        type {
          id
        }
        quantity
        published
        thumbnail {
          id
          image
          placeholder
        }
      }
    }
  }
`;

export const UPDATE_VARIABLE_PRODUCT_INFORMATION = gql`
  mutation UpdateVariableProductInformation(
    $id: Int!
    $additions: ProductInput!
    $deletions: ProductInput!
  ) {
    updateVariableProductInformation(
      id: $id
      additions: $additions
      deletions: $deletions
    ) {
      id
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
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      name
    }
  }
`;
