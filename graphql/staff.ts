import { gql } from '@apollo/client';

export const STAFF = gql`
  query Staff($id: ID!) {
    staff(id: $id) {
      id
      first_name
      last_name
      phone_number
      email
      profile {
        image
        placeholder
      }
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
      profile {
        image
        placeholder
      }
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
    $profile: IMGInput
    $password: String!
    $role_id: Int!
  ) {
    createStaff(
      first_name: $first_name
      last_name: $last_name
      phone_number: $phone_number
      email: $email
      profile: $profile
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
    $profile: IMGInput
    $role_id: Int!
  ) {
    updateStaff(
      id: $id
      first_name: $first_name
      last_name: $last_name
      phone_number: $phone_number
      email: $email
      profile: $profile
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
