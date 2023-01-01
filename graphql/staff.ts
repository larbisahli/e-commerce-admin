import { gql } from '@apollo/client';

export const STAFF_INFO = gql`
  query StaffInfo($id: ID!) {
    staffInfo(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      email
      isTenant
      profile {
        image
        placeholder
      }
      role {
        id
        roleName
        privileges
      }
    }
  }
`;

export const STAFF = gql`
  query Staff($id: ID!) {
    staff(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      email
      isTenant
      profile {
        id
        image
        placeholder
      }
      role {
        id
        roleName
        privileges
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
    staffCount {
      count
    }
    staffs(page: $page, limit: $limit, orderBy: $orderBy, sortedBy: $sortedBy) {
      id
      firstName
      lastName
      email
      phoneNumber
      profile {
        image
        placeholder
      }
      active
      role {
        id
        roleName
      }
      createdAt
      updatedAt
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

export const ROLES_FOR_SELECT = gql`
  query Roles {
    roles {
      id
      roleName
    }
  }
`;

export const CREATE_STAFF = gql`
  mutation CreateStaff(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $email: String
    $profile: [ImageInput]
    $password: String!
    $roleId: Int!
    $notify: Boolean
  ) {
    createStaff(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      profile: $profile
      password: $password
      roleId: $roleId
      notify: $notify
    ) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_STAFF = gql`
  mutation UpdateStaff(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $email: String
    $profile: [ImageInput]
    $roleId: Int!
  ) {
    updateStaff(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      profile: $profile
      roleId: $roleId
    ) {
      id
      firstName
      lastName
    }
  }
`;

export const DELETE_STAFF = gql`
  mutation DeleteStaff($id: ID!) {
    deleteStaff(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const BAN_STAFF = gql`
  mutation BanStaff($id: ID!, $active: Boolean!) {
    banStaff(id: $id, active: $active) {
      id
      firstName
      lastName
    }
  }
`;
