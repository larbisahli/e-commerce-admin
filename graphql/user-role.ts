import { gql } from '@apollo/client';

export const ROLES = gql`
  query Roles($etag: String!) {
    roles(etag: $etag) {
      id
      name
    }
  }
`;

export const ROLE = gql`
  query Role($id: ID!, $etag: String!) {
    role(id: $id, etag: $etag) {
      id
      name
      privileges {
        resources {
          user {
            permissions {
              read
              write
              update
              delete
            }
          }
          category {
            permissions {
              read
              write
              update
              delete
            }
          }
          product {
            permissions {
              read
              write
              update
              delete
            }
          }
          tag {
            permissions {
              read
              write
              update
              delete
            }
          }
          tax {
            permissions {
              read
              write
              update
              delete
            }
          }
          supplier {
            permissions {
              read
              write
              update
              delete
            }
          }
          attribute {
            permissions {
              read
              write
              update
              delete
            }
          }
          customer {
            permissions {
              read
              write
              update
              delete
            }
          }
          shipping {
            permissions {
              read
              write
              update
              delete
            }
          }
          coupon {
            permissions {
              read
              write
              update
              delete
            }
          }
          orderStatus {
            permissions {
              read
              write
              update
              delete
            }
          }
          order {
            permissions {
              read
              write
              update
              delete
            }
          }
          role {
            permissions {
              read
              write
              update
              delete
            }
          }
          sliders {
            permissions {
              read
              write
              update
              delete
            }
          }
          theme {
            permissions {
              read
              write
              update
              delete
            }
          }
          store {
            permissions {
              read
              write
              update
              delete
            }
          }
          marketPlace {
            permissions {
              read
              write
              update
              delete
            }
          }
          storeSettings {
            permissions {
              read
              write
              update
              delete
            }
          }
          pages {
            permissions {
              read
              write
              update
              delete
            }
          }
          media {
            permissions {
              read
              write
              update
              delete
            }
          }
          manufacturer {
            permissions {
              read
              write
              update
              delete
            }
          }
          storeLanguage {
            permissions {
              read
              write
              update
              delete
            }
          }
        }
      }
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation CreateRole($name: String!, $privileges: PrivilegesInput!) {
    createRole(name: $name, privileges: $privileges) {
      name
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole(
    $id: Int!
    $name: String!
    $privileges: PrivilegesInput!
  ) {
    updateRole(id: $id, name: $name, privileges: $privileges) {
      name
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
