import { gql } from '@apollo/client';

export const DELETE_IMAGE_OBJECT = gql`
  mutation DeleteImageObject($image: String!, $placeholder: String!) {
    deleteImageObject(image: $image, placeholder: $placeholder) {
      image
    }
  }
`;
