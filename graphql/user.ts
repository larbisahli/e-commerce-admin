import { gql } from '@apollo/client';

export const USER_INFO = gql`
  query UserInfo($id: ID!, $payload: ID!) {
    userInfo(id: $id, payload: $payload) {
      id
      firstName
      lastName
      phoneNumber
      email
      isAdmin
      profile {
        image
        placeholder
      }
      role {
        id
        name
      }
    }
  }
`;

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      email
      isAdmin
      active
      profile {
        id
        image
        placeholder
      }
      role {
        id
        name
      }
    }
  }
`;

export const USER_AUTH = gql`
  query UserAuth {
    userAuth {
      id
      firstName
      lastName
      phoneNumber
      email
      isAdmin
      active
      store {
        storeName
        published
        tier
        alias
      }
      googleProfileImage
      profile {
        id
        image
        placeholder
      }
      role {
        id
        name
      }
    }
  }
`;

export const USERS = gql`
  query Users(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    userCount {
      count
    }
    users(page: $page, limit: $limit, orderBy: $orderBy, sortedBy: $sortedBy) {
      id
      firstName
      lastName
      email
      isAdmin
      phoneNumber
      googleProfileImage
      profile {
        image
        placeholder
      }
      active
      role {
        id
        name
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

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $email: String!
    $profile: [ImageInput]
    $roleId: Int!
  ) {
    createUser(
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

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $email: String!
    $profile: [ImageInput]
    $roleId: Int!
  ) {
    updateUser(
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const BAN_USER = gql`
  mutation BanUser($id: ID!, $active: Boolean!) {
    banUser(id: $id, active: $active) {
      id
      firstName
      lastName
    }
  }
`;
