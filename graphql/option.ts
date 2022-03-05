import { gql } from '@apollo/client';

export const CREATE_OPTION = gql`
  mutation CreateOption(
    $attribute_uid: ID!
    $option_name: String!
    $additional_price: Float!
    $color_hex: String
  ) {
    createOption(
      attribute_uid: $attribute_uid
      option_name: $option_name
      additional_price: $additional_price
      color_hex: $color_hex
    ) {
      option_name
    }
  }
`;

export const UPDATE_OPTION = gql`
  mutation UpdateOption(
    $option_uid: ID!
    $option_name: String!
    $additional_price: Float!
    $color_hex: String
  ) {
    updateOption(
      option_uid: $option_uid
      option_name: $option_name
      additional_price: $additional_price
      color_hex: $color_hex
    ) {
      option_name
    }
  }
`;

export const DELETE_OPTION = gql`
  mutation DeleteOption($option_uid: ID!) {
    DeleteOption(option_uid: $option_uid) {
      option_name
    }
  }
`;
