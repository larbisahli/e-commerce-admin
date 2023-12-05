/* eslint-disable no-unused-vars */

import { Scalars } from '@ts-types/custom.types';
import {
  AttributeValue,
  Category,
  ImageType,
  ManufacturerType,
  Product,
  Suppliers,
  Tag,
  VariationOptionsType,
  VariationType
} from '@ts-types/generated';

export enum Actions {
  APPEND_ATTRIBUTE = 'APPEND_ATTRIBUTE',
  REMOVE_ATTRIBUTE = 'UPDATE_ATTRIBUTE',
  CHANGE_ATTRIBUTE = 'CHANGE_ATTRIBUTE',
  CHANGE_ATTRIBUTE_VALUE = 'CHANGE_ATTRIBUTE_VALUE',
  APPEND_VARIATION = 'APPEND_VARIATION',
  CHANGE_VARIATION = 'CHANGE_VARIATION',
  REMOVE_VARIATION = 'REMOVE_VARIATION',
  CHANGE_VARIATION_VALUES = 'CHANGE_VARIATION_VALUES',
  CHANGE_VARIATION_OPTION = 'CHANGE_VARIATION_OPTION',
  VARIATION_INIT = 'INIT',
  VARIATION_CARTESIAN = 'CARTESIAN',
  CONTENT = 'CONTENT',
  THUMBNAIL = 'THUMBNAIL',
  GALLERY = 'GALLERY',
  TAGS = 'TAGS',
  SUPPLIERS = 'SUPPLIERS',
  CATEGORIES = 'CATEGORIES',
  MANUFACTURERS = 'MANUFACTURERS',
  PRODUCT_SHIPPING_INFO = 'PRODUCT_SHIPPING_INFO',
  PRODUCT_SEO = 'PRODUCT_SEO',
  INSERT_PRODUCT_LIST = 'INSERT_PRODUCT_LIST',
  INITIAL_VALUES = 'INITIAL_VALUES'
}

export interface ProductFormType extends Product {
  isUpdateMode: boolean;
  isFork: boolean;
}

export interface ActionType {
  type: Actions;
  payload: VariationPayload;
}

interface VariationPayload {
  value?: any;
  id?: Scalars['ID'];
  values?: (
    | Category
    | Tag
    | Suppliers
    | ManufacturerType
    | ImageType
    | AttributeValue
    | CartesianType[]
    | AttributeValue
  )[];
  field?: string;
  options?: number[];
  init?: ProductFormType;
}

export interface VariationReducerType {
  variations: VariationType[];
  variationOptions: VariationOptionsType[];
}

export interface CartesianType {
  id: Scalars['Int'];
  name: string;
  value: string;
}
