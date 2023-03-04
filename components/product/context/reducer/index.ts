import {
  Category,
  ProductStatus,
  ProductType,
  Suppliers,
  Tag
} from '@ts-types/generated';
import { isEmpty } from 'lodash';

import { Actions, ActionType, ProductFormType } from '../form.types';
import { VariationReducer } from './variation.reducer';

const {
  APPEND_VARIATION,
  REMOVE_VARIATION,
  CHANGE_VARIATION,
  VARIATION_CARTESIAN,
  CHANGE_VARIATION_VALUES,
  CHANGE_VARIATION_OPTION,
  VARIATION_INIT,
  CONTENT,
  THUMBNAIL,
  GALLERY,
  TAGS,
  SUPPLIERS,
  CATEGORIES,
  PRODUCT_SHIPPING_INFO,
  PRODUCT_SEO,
  INSERT_PRODUCT_LIST,
  INITIAL_VALUES
} = Actions;

export function formReducer(
  state: ProductFormType,
  action: ActionType
): ProductFormType {
  const { type, payload } = action;

  switch (type) {
    case CONTENT:
      return {
        ...state,
        [payload?.field]: payload?.value
      };
    case THUMBNAIL:
      return {
        ...state,
        [payload?.field]: payload?.values
      };
    case GALLERY:
      return {
        ...state,
        [payload?.field]: payload?.values
      };
    case CATEGORIES:
      return {
        ...state,
        categories: payload.values as Category[]
      };
    case TAGS:
      return {
        ...state,
        tags: payload.values as Tag[]
      };
    case SUPPLIERS:
      return {
        ...state,
        suppliers: payload.values as Suppliers[]
      };
    case PRODUCT_SHIPPING_INFO:
      return {
        ...state,
        productShippingInfo: {
          ...state.productShippingInfo,
          [payload.field]: payload.value
        }
      };
    case INSERT_PRODUCT_LIST:
      return {
        ...state,
        [payload.field]: payload.values
      };
    case PRODUCT_SEO:
      return {
        ...state,
        productSeo: {
          ...state.productSeo,
          [payload.field]: payload.value
        }
      };
    case APPEND_VARIATION:
      return {
        ...state,
        ...VariationReducer[APPEND_VARIATION](state, action)
      };
    case REMOVE_VARIATION:
      return {
        ...state,
        ...VariationReducer[REMOVE_VARIATION](state, action)
      };
    case CHANGE_VARIATION:
      return {
        ...state,
        ...VariationReducer[CHANGE_VARIATION](state, action)
      };
    case CHANGE_VARIATION_VALUES:
      return {
        ...state,
        ...VariationReducer[CHANGE_VARIATION_VALUES](state, action)
      };
    case CHANGE_VARIATION_OPTION:
      return {
        ...state,
        ...VariationReducer[CHANGE_VARIATION_OPTION](state, action)
      };
    case VARIATION_CARTESIAN:
      return {
        ...state,
        ...VariationReducer[VARIATION_CARTESIAN](state, action)
      };
    case VARIATION_INIT:
      return {
        ...state,
        ...VariationReducer[VARIATION_INIT](state, action)
      };
    case INITIAL_VALUES: {
      const { init } = payload;
      if (isEmpty(init)) {
        return state;
      }
      return {
        ...state,
        ...init,
        status: init?.published ? ProductStatus.Publish : ProductStatus.Draft,
        type:
          init?.type.id === ProductType.Simple
            ? { name: 'Simple Product', id: ProductType.Simple }
            : { name: 'Variable Product', id: ProductType.Variable },
        isUpdateMode: true
      };
    }
    default:
      return state;
  }
}
