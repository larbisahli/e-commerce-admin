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
      product_name
      sale_price
      quantity
      published
      categories {
        id
        category_name
      }
      thumbnail {
        id
        image
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

export const PRODUCT = gql`
  query Product($id: ID!) {
    productsCount {
      count
    }
    product(id: $id) {
      id
      product_name
      sku
      sale_price
      compare_price
      buying_price
      quantity
      short_description
      product_description
      published
      disable_out_of_stock
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
        category_name
      }
      suppliers {
        id
        supplier_name
      }
      tags {
        id
        tag_name
      }
      variation_options {
        title
        active
        image
        options
        sale_price
        compare_price
        buying_price
        quantity
        sku
      }
      variations {
        attribute {
          id
          attribute_name
        }
        attribute_values {
          id
          attribute_value
        }
      }
      shippings {
        shipping_provider {
          id
          shipping_name
        }
        shipping_price
      }
      product_shipping_options {
        id
        weight
        weight_unit
        volume
        volume_unit
        dimension_width
        dimension_height
        dimension_depth
        dimension_unit
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

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $product_name: String!
    $sale_price: Float!
    $compare_price: Float
    $buying_price: Float
    $quantity: Int!
    $short_description: String!
    $product_description: String!
    $published: Boolean!
    $disable_out_of_stock: Boolean!
    $note: String
    $sku: String
    $thumbnail: [IMGInput]
    $gallery: [IMGInput]
    $categories: [CategoryInput]
    $suppliers: [SupplierInput]
    $tags: [TagInput]
    $variation_options: [VariationOptionInput]
    $variations: [VariationInput]
    $shippings: [ProductShippingInput]
    $product_shipping_options: ProductShippingOptionInput
  ) {
    createProduct(
      product_name: $product_name
      sale_price: $sale_price
      compare_price: $compare_price
      buying_price: $buying_price
      quantity: $quantity
      short_description: $short_description
      product_description: $product_description
      published: $published
      disable_out_of_stock: $disable_out_of_stock
      note: $note
      sku: $sku
      thumbnail: $thumbnail
      gallery: $gallery
      categories: $categories
      suppliers: $suppliers
      tags: $tags
      variation_options: $variation_options
      variations: $variations
      shippings: $shippings
      product_shipping_options: $product_shipping_options
    ) {
      product_name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $product_name: String!
    $sale_price: Float!
    $compare_price: Float
    $buying_price: Float
    $quantity: Int!
    $short_description: String!
    $product_description: String!
    $published: Boolean!
    $disable_out_of_stock: Boolean!
    $note: String
    $sku: String
    $thumbnail: [IMGInput]
    $gallery: [IMGInput]
    $categories: [CategoryInput]
    $suppliers: [SupplierInput]
    $tags: [TagInput]
    $variation_options: [VariationOptionInput]
    $variations: [VariationInput]
    $shippings: [ProductShippingInput]
    $product_shipping_options: ProductShippingOptionInput
  ) {
    updateProduct(
      id: $id
      product_name: $product_name
      sale_price: $sale_price
      compare_price: $compare_price
      buying_price: $buying_price
      quantity: $quantity
      short_description: $short_description
      product_description: $product_description
      published: $published
      disable_out_of_stock: $disable_out_of_stock
      note: $note
      sku: $sku
      thumbnail: $thumbnail
      gallery: $gallery
      categories: $categories
      suppliers: $suppliers
      tags: $tags
      variation_options: $variation_options
      variations: $variations
      shippings: $shippings
      product_shipping_options: $product_shipping_options
    ) {
      product_name
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      product_name
    }
  }
`;
