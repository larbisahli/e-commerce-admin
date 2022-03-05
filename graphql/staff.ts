import { gql } from '@apollo/client';

export const STAFF = gql`
  query Staff($id: ID!) {
    staff(id: $id) {
      id
      first_name
      last_name
      phone_number
      email
      profile_img
      role {
        id
        role_name
        privileges
      }
      created_at
      updated_at
      created_by {
        id
        first_name
        last_name
        profile_img
      }
      updated_by {
        id
        first_name
        last_name
        profile_img
      }
    }
  }
`;

export const STAFFS = gql`
  query Staffs(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    staffsCount {
      count
    }
    staffs(page: $page, limit: $limit, orderBy: $orderBy, sortedBy: $sortedBy) {
      id
      first_name
      last_name
      email
      profile_img
      active
      role {
        id
        role_name
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

export const ROLES_FOR_SELECT = gql`
  query Roles {
    roles {
      id
      role_name
    }
  }
`;

export const CREATE_STAFF = gql`
  mutation CreateStaff(
    $first_name: String!
    $last_name: String!
    $phone_number: String
    $email: String!
    $profile_img: String
    $password: String!
    $role_id: Int!
  ) {
    createStaff(
      first_name: $first_name
      last_name: $last_name
      phone_number: $phone_number
      email: $email
      profile_img: $profile_img
      password: $password
      role_id: $role_id
    ) {
      id
      first_name
      last_name
    }
  }
`;

export const UPDATE_STAFF = gql`
  mutation UpdateStaff(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $phone_number: String
    $email: String!
    $profile_img: String
    $role_id: Int!
  ) {
    updateStaff(
      id: $id
      first_name: $first_name
      last_name: $last_name
      phone_number: $phone_number
      email: $email
      profile_img: $profile_img
      role_id: $role_id
    ) {
      id
      first_name
      last_name
    }
  }
`;

export const DELETE_STAFF = gql`
  mutation DeleteStaff($id: ID!) {
    deleteStaff(id: $id) {
      id
      first_name
      last_name
    }
  }
`;

export const BAN_STAFF = gql`
  mutation BanStaff($id: ID!, $active: Boolean!) {
    banStaff(id: $id, active: $active) {
      id
      first_name
      last_name
    }
  }
`;
