import { gql } from '@apollo/client';

export const ROLES = gql`
  query Roles {
    roles {
      id
      roleName
    }
  }
`;

export const ROLE = gql`
  query Role {
    role {
      id
      roleName
      # resource
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation CreateRole($roleName: String!, $resource: ResourceInput!) {
    createRole(roleName: $roleName, resource: $resource) {
      roleName
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole(
    $id: String!
    $roleName: String!
    $resource: ResourceInput!
  ) {
    updateRole(id: $id, roleName: $roleName, resource: $resource) {
      roleName
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
