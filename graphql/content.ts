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

export const ADD_LAYOUT_COMPONENT = gql`
  mutation AddLayoutComponent(
    $layoutName: String!
    $moduleName: String!
    $beforeComponentId: String
    $afterComponentId: String
    $position: Int!
    $data: JSONObject!
    $styles: JSONObject!
  ) {
    addLayoutComponent(
      layoutName: $layoutName
      moduleName: $moduleName
      beforeComponentId: $beforeComponentId
      afterComponentId: $afterComponentId
      position: $position
      data: $data
      styles: $styles
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
