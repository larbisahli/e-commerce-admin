import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query Products(
    $id: Int
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
    $language: LanguageInput!
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
      language: $language
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
      thumbnail {
        id
        image
        placeholder
      }
      translated {
        name
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
  query Product($id: Int!, $language: LanguageInput!) {
    product(id: $id, language: $language) {
      id
      name
      description
      note
      sku
      salePrice
      comparePrice
      buyingPrice
      quantity
      type {
        id
      }
      published
      disableOutOfStock
      freeShipping
      displayProductMeasurements
      translated {
        name
        description
        note
      }
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
        translated {
          name
        }
      }
      suppliers {
        id
        name
      }
      tags {
        id
        name
        translated {
          name
        }
      }
      manufacturers {
        id
        name
        translated {
          name
        }
      }
      attributes {
        id
        attribute {
          id
          name
        }
        selectedValue {
          id
          value
        }
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
        weight
        weightUnit {
          unit
        }
        dimensionWidth
        dimensionHeight
        dimensionLength
        dimensionUnit {
          unit
        }
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
        weight
        weightUnit {
          unit
        }
        dimensionWidth
        dimensionHeight
        dimensionLength
        dimensionUnit {
          unit
        }
      }

      productSeo {
        slug
        metaTitle
        metaKeywords
        metaDescription
        metaImage {
          id
          image
          placeholder
        }
        translated {
          metaTitle
          metaKeywords
          metaDescription
        }
      }
    }
  }
`;

export const LINKED_PRODUCTS = gql`
  query RelatedProducts($id: Int, $language: LanguageInput!) {
    relatedProducts(id: $id, language: $language) {
      id
      sku
      name
      translated {
        name
      }
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
    upsellProducts(id: $id, language: $language) {
      id
      sku
      name
      translated {
        name
      }
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
    crossSellProducts(id: $id, language: $language) {
      id
      sku
      name
      translated {
        name
      }
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
    $freeShipping: Boolean!
    $displayProductMeasurements: Boolean!
    $note: String
    $sku: String
    $thumbnail: [ImageInput!]!
    $gallery: [ImageInput!]!
    $categories: [CategoryInput!]!
    $suppliers: [SupplierInput]
    $tags: [TagInput]
    $manufacturers: [ManufacturerInput]
    $attributes: [AttributeVariationInput]
    $variationOptions: [VariationOptionInput]
    $variations: [VariationInput]
    $productShippingInfo: ProductShippingInfoInput
    $productSeo: ProductSeoInput!
    $relatedProducts: [ProductInput]
    $upsellProducts: [ProductInput]
    $crossSellProducts: [ProductInput]
    $language: LanguageInput!
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
      freeShipping: $freeShipping
      displayProductMeasurements: $displayProductMeasurements
      note: $note
      sku: $sku
      thumbnail: $thumbnail
      gallery: $gallery
      categories: $categories
      suppliers: $suppliers
      tags: $tags
      manufacturers: $manufacturers
      attributes: $attributes
      variationOptions: $variationOptions
      variations: $variations
      productShippingInfo: $productShippingInfo
      productSeo: $productSeo
      relatedProducts: $relatedProducts
      upsellProducts: $upsellProducts
      crossSellProducts: $crossSellProducts
      language: $language
    ) {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $language: LanguageInput!
    $additions: ProductInput!
    $deletions: ProductInput!
  ) {
    updateProduct(
      id: $id
      language: $language
      additions: $additions
      deletions: $deletions
    ) {
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
    $freeShipping: Boolean!
    $displayProductMeasurements: Boolean!
    $productSeo: ProductSeoInput!
    $language: LanguageInput!
  ) {
    updateProductContent(
      id: $id
      name: $name
      note: $note
      description: $description
      published: $published
      disableOutOfStock: $disableOutOfStock
      freeShipping: $freeShipping
      displayProductMeasurements: $displayProductMeasurements
      productSeo: $productSeo
      language: $language
    ) {
      id
      name
      description
      note
      published
      disableOutOfStock
      freeShipping
      displayProductMeasurements
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
    $attributes: AttributeVariationUpdateInput
    $language: LanguageInput!
  ) {
    updateSimpleProductInformation(
      id: $id
      salePrice: $salePrice
      comparePrice: $comparePrice
      buyingPrice: $buyingPrice
      quantity: $quantity
      sku: $sku
      attributes: $attributes
      language: $language
    ) {
      salePrice
      comparePrice
      buyingPrice
      quantity
      sku
      attributes {
        id
        attribute {
          id
          name
        }
        selectedValue {
          id
          value
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT_SELECT_GROUP = gql`
  mutation UpdateProductSelectGroup(
    $id: Int!
    $language: LanguageInput!
    $additions: ProductInput
    $deletions: ProductInput
  ) {
    updateProductSelectGroup(
      id: $id
      language: $language
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
      manufacturers {
        id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT_SEO = gql`
  mutation UpdateProductSeo(
    $id: Int!
    $name: String
    $description: String
    $note: String
    $language: LanguageInput!
    $productSeo: ProductSeoInput!
  ) {
    updateProductSeo(
      id: $id
      name: $name
      description: $description
      note: $note
      language: $language
      productSeo: $productSeo
    ) {
      id
      productSeo {
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
        dimensionWidth
        dimensionHeight
        dimensionLength
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
    $language: LanguageInput!
    $additions: ProductInput!
    $deletions: ProductInput!
  ) {
    updateVariableProductInformation(
      id: $id
      language: $language
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
        weight
        weightUnit {
          unit
        }
        dimensionWidth
        dimensionHeight
        dimensionLength
        dimensionUnit {
          unit
        }
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
