import { gql } from '@apollo/client';

export const STORE_LAYOUT_COMPONENT_CONTENT = gql`
  query StoreLayoutComponentContent(
    $componentId: ID!
    $language: LanguageInput!
  ) {
    storeLayoutComponentContent(
      componentId: $componentId
      language: $language
    ) {
      moduleName
      contentId
      data
    }
    storeLayoutComponentStyles(componentId: $componentId) {
      styles
    }
  }
`;

export const STORE_LAYOUTS = gql`
  query StoreLayouts($layoutName: String!) {
    storeLayouts {
      id
      name
      title
      isCustom
    }
    storeLayoutComponents(layoutName: $layoutName) {
      componentId
      moduleName
      moduleGroup
      isVisible
      position
    }
    storeLayoutCommonComponents {
      componentId
      moduleName
      moduleGroup
    }
  }
`;

export const GET_STORE_LAYOUT = gql`
  query GetLayoutPage($id: ID!, $language: LanguageInput!) {
    getLayoutPage(id: $id, language: $language) {
      id
      name
      title
      isCustom
      metadata
    }
  }
`;

export const UPDATE_LAYOUT_COMPONENT_CONTENT = gql`
  mutation UpdateLayoutComponent(
    $componentId: ID!
    $contentId: ID
    $data: JSONObject!
    $language: LanguageInput!
  ) {
    updateLayoutComponent(
      componentId: $componentId
      contentId: $contentId
      data: $data
      language: $language
    ) {
      componentId
    }
  }
`;

export const UPDATE_LAYOUT_COMPONENT_STYLES = gql`
  mutation UpdateLayoutComponentStyles(
    $componentId: ID!
    $styles: JSONObject!
  ) {
    updateLayoutComponentStyles(componentId: $componentId, styles: $styles) {
      componentId
    }
  }
`;

export const UPDATE_LAYOUT_COMPONENT_MODULE_NAME = gql`
  mutation UpdateComponentModuleName($componentId: ID!, $moduleName: String!) {
    updateComponentModuleName(
      componentId: $componentId
      moduleName: $moduleName
    ) {
      componentId
      moduleName
    }
  }
`;

export const CREATE_LAYOUT = gql`
  mutation CreateLayout(
    $title: String!
    $slug: String!
    $metadata: JSONObject!
    $language: LanguageInput!
  ) {
    createLayout(
      title: $title
      slug: $slug
      metadata: $metadata
      language: $language
    ) {
      id
      name
    }
  }
`;

export const UPDATE_LAYOUT = gql`
  mutation UpdateLayout(
    $id: ID!
    $title: String!
    $slug: String!
    $metadata: JSONObject!
    $language: LanguageInput!
  ) {
    updateLayout(
      id: $id
      title: $title
      slug: $slug
      metadata: $metadata
      language: $language
    ) {
      id
      name
    }
  }
`;

export const ADD_LAYOUT_COMPONENT = gql`
  mutation AddLayoutComponent(
    $layoutName: String!
    $moduleName: String!
    $beforeComponentId: String
    $afterComponentId: String
    $position: Int!
    $data: JSONObject!
    $styles: JSONObject!
    $children: [StoreLayoutComponentInput]
  ) {
    addLayoutComponent(
      layoutName: $layoutName
      moduleName: $moduleName
      beforeComponentId: $beforeComponentId
      afterComponentId: $afterComponentId
      position: $position
      data: $data
      styles: $styles
      children: $children
    ) {
      componentId
    }
  }
`;

export const UPDATE_LAYOUT_COMPONENT_VISIBILITY = gql`
  mutation UpdateLayoutComponentVisibility($componentId: ID!) {
    updateLayoutComponentVisibility(componentId: $componentId) {
      componentId
    }
  }
`;

export const UPDATE_LAYOUT_COMPONENTS_POSITION = gql`
  mutation UpdateLayoutComponentsPosition(
    $components: [StoreLayoutComponentInput]!
  ) {
    updateLayoutComponentsPosition(components: $components) {
      success
    }
  }
`;

export const DELETE_LAYOUT_COMPONENT = gql`
  mutation DeleteLayoutComponent($componentId: ID!) {
    deleteLayoutComponent(componentId: $componentId) {
      componentId
    }
  }
`;
