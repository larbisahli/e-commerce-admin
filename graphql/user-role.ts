import { gql } from '@apollo/client';

export const ROLES = gql`
  query Roles {
    roles {
      id
      name
    }
  }
`;

export const ROLE = gql`
  query Role {
    role {
      id
      name
      # resource
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation CreateRole($name: String!, $resource: ResourceInput!) {
    createRole(name: $name, resource: $resource) {
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
    updateRole(id: $id, name: $name, resource: $resource) {
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
