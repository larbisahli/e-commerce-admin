import { gql } from '@apollo/client';

export const PRODUCTS_FOR_ADMIN = gql`
  query ProductsForAdmin(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    productsCount {
      count
    }
    productsForAdmin(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      product_name
      sale_price
      max_price
      min_price
      quantity
      published
      categories {
        id
        category_name
      }
      thumbnail {
        id
        image
        placeholder
      }
      created_at
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
  query ProductForAdmin($id: ID!) {
    productForAdmin(id: $id) {
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
        product_shipping_id
        shipping_provider {
          id
          shipper_name
        }
        shipping_zones {
          id
          shipping_price
          zones {
            name
            code
          }
        }
      }
      product_shipping_info {
        id
        weight
        weight_unit {
          unit
        }
        volume
        volume_unit {
          unit
        }
        dimension_width
        dimension_height
        dimension_depth
        dimension_unit {
          unit
        }
      }
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile {
          image
          placeholder
        }
      }
      updated_by {
        id
        first_name
        last_name
        profile {
          image
          placeholder
        }
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
    $thumbnail: IMGInput
    $gallery: [IMGInput]
    $categories: [CategoryInput]
    $suppliers: [SupplierInput]
    $tags: [TagInput]
    $variation_options: [VariationOptionInput]
    $variations: [VariationInput]
    $shippings: [ProductShippingInput]
    $product_shipping_info: ProductShippingInfoInput
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
      product_shipping_info: $product_shipping_info
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
    $thumbnail: IMGInput
    $gallery: [IMGInput]
    $categories: [CategoryInput]
    $suppliers: [SupplierInput]
    $tags: [TagInput]
    $variation_options: [VariationOptionInput]
    $variations: [VariationInput]
    $shippings: [ProductShippingInput]
    $product_shipping_info: ProductShippingInfoInput
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
      product_shipping_info: $product_shipping_info
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

export const DELETE_SHIPPING_ZONE = gql`
  mutation DeleteShippingZone($id: ID!) {
    deleteShippingZone(id: $id) {
      id
    }
  }
`;

export const DELETE_SHIPPING_PROVIDER = gql`
  mutation DeleteShippingProvider($product_shipping_id: ID!) {
    deleteShippingProvider(product_shipping_id: $product_shipping_id) {
      product_shipping_id
    }
  }
`;
