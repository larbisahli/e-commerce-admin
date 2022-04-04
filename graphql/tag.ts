import { gql } from '@apollo/client';

export const TAGS = gql`
  query TagsForAdmin(
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortedBy: String!
  ) {
    tagsCount {
      count
    }
    tagsForAdmin(
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortedBy: $sortedBy
    ) {
      id
      tag_name
      icon
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

export const TAG = gql`
  query TagForAdmin($id: ID!) {
    tagForAdmin(id: $id) {
      id
      tag_name
      icon
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

export const TAGS_FOR_SELECT = gql`
  query TagsSelectForAdmin($page: Int!, $limit: Int!, $orderBy: String!) {
    tagsSelectForAdmin(page: $page, limit: $limit, orderBy: $orderBy) {
      id
      tag_name
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($tag_name: String!, $icon: String) {
    createTag(tag_name: $tag_name, icon: $icon) {
      id
      tag_name
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $tag_name: String!, $icon: String) {
    updateTag(id: $id, tag_name: $tag_name, icon: $icon) {
      id
      tag_name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
      tag_name
    }
  }
`;
