import {
  AttributeValue,
  Category,
  ManufacturerType,
  ProductStatus,
  ProductType,
  Suppliers,
  Tag
} from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';

import { Actions, ActionType, ProductFormType } from '../form.types';
import { VariationReducer } from './variation.reducer';

const {
  APPEND_ATTRIBUTE,
  CHANGE_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
  CHANGE_ATTRIBUTE_VALUE,
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
  MANUFACTURERS,
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
    case MANUFACTURERS:
      return {
        ...state,
        manufacturers: payload.values as ManufacturerType[]
      };
    case SUPPLIERS:
      return {
        ...state,
        suppliers: payload.values as Suppliers[]
      };
    case APPEND_ATTRIBUTE:
      return {
        ...state,
        attributes: [...(state?.attributes ?? []), payload.value]
      };
    case REMOVE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes?.filter(
          (attribute) => attribute.id !== payload.id
        )
      };
    case CHANGE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes?.map((attribute) => {
          if (attribute.id === payload.id) {
            attribute.attribute = payload.value;
            attribute.value = null;
          }
          return attribute;
        })
      };
    case CHANGE_ATTRIBUTE_VALUE:
      return {
        ...state,
        attributes: state.attributes?.map((attribute) => {
          if (attribute.id === payload.id) {
            attribute.value = payload.value;
          }
          return attribute;
        })
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
      return cloneDeep({
        ...state,
        ...init,
        status: init?.published ? ProductStatus.Publish : ProductStatus.Draft,
        type:
          init?.type.id === ProductType.Simple
            ? { name: 'Simple Product', id: ProductType.Simple }
            : { name: 'Variable Product', id: ProductType.Variable },
        variations: init.variations?.map((variation) => {
          return {
            id: nanoid(),
            ...variation
          };
        }),
        isUpdateMode: true
      });
    }
    default:
      return state;
  }
}
