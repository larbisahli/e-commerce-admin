import type {
  ADD_SECTION_MODAL_TYPE,
  BAN_CUSTOMER_TYPE,
  BAN_USER_TYPE,
  CMS_BUILDER_MODAL_TYPE,
  DELETE_ATTRIBUTE_TYPE,
  DELETE_COMPONENT_TYPE,
  DELETE_COUPON_TYPE,
  DELETE_CUSTOMER_TYPE,
  DELETE_DELIVERY_TIME_TYPE,
  DELETE_LANGUAGE_TYPE,
  DELETE_MANUFACTURER_TYPE,
  DELETE_ORDER_STATUS_TYPE,
  DELETE_ORDER_TYPE,
  DELETE_PRODUCT_TYPE,
  DELETE_SHIPPING_TYPE,
  DELETE_SUPPLIER_TYPE,
  DELETE_TAG_TYPE,
  DELETE_TAX_TYPE,
  DELETE_USER_TYPE,
  FAVICON_VIEWER_MODAL_TYPE,
  IMAGE_MODAL_TYPE,
  LIBRARY_SECTION_MODAL_TYPE,
  MEDIA_ITEM_MODAL_TYPE,
  NEW_PAGE_MODAL_TYPE,
  PRODUCT_MODAL_TYPE,
  TAX_MODAL_TYPE
} from './constants';
import { LanguageType, OrderBy, SortOrder, UserType } from './generated';

// Nullable can be assigned to a value or can be assigned to null.
export declare type Nullable<T> = T | null;

/** Built-in and custom scalars are mapped to their actual values */
export declare type Scalars = {
  ID: string | number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: string | number | Date;
  JSON: { [key: string]: string | number | boolean };
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: string | number | Date;
  Upload: string | number | Date;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: string | number | Date;
  /** A datetime and timezone string in ISO 8601 format `Y-m-dTH:i:sO`, e.g. `2020-04-20T13:53:12+02:00`. */
  DateTimeTz: string | number | Date;
};

export interface JwtPayload {
  uid: string;
  iss: string;
  iat: number;
  ema: string;
  ali: string;
  sid: string;
  tok?: string;
}

export type SSRProps = {
  token?: string | null;
  client?: UserType | null;
};

export type ModalView =
  | DELETE_PRODUCT_TYPE
  | DELETE_ATTRIBUTE_TYPE
  | DELETE_CUSTOMER_TYPE
  | DELETE_ORDER_TYPE
  | DELETE_COUPON_TYPE
  | DELETE_SHIPPING_TYPE
  | DELETE_DELIVERY_TIME_TYPE
  | DELETE_ORDER_STATUS_TYPE
  | DELETE_TAG_TYPE
  | DELETE_LANGUAGE_TYPE
  | BAN_CUSTOMER_TYPE
  | BAN_USER_TYPE
  | DELETE_USER_TYPE
  | DELETE_SUPPLIER_TYPE
  | DELETE_TAX_TYPE
  | DELETE_MANUFACTURER_TYPE
  | IMAGE_MODAL_TYPE
  | PRODUCT_MODAL_TYPE
  | FAVICON_VIEWER_MODAL_TYPE
  | CMS_BUILDER_MODAL_TYPE
  | ADD_SECTION_MODAL_TYPE
  | LIBRARY_SECTION_MODAL_TYPE
  | NEW_PAGE_MODAL_TYPE
  | DELETE_COMPONENT_TYPE
  | MEDIA_ITEM_MODAL_TYPE
  | TAX_MODAL_TYPE;

export type CategoryQueryOptionsType = {
  id?: Scalars['Int'];
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type AttributeQueryOptionsType = {
  id?: Scalars['Int'];
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type AttributeValueQueryOptionsType = {
  id?: Scalars['Int'];
  attribute_id?: Scalars['String'];
  attribute_value?: Scalars['String'];
  color?: Nullable<Scalars['String']>;
};

export type TagsQueryOptionsType = {
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type CurrencyType = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  is_default: boolean;
};

export interface TableQueryVariables {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
  language: LanguageType;
  etag: string;
}

// export type ProductsQueryOptionsType = {
//   page?: number;
//   shop_id?: number;
//   text?: string;
//   type?: string;
//   category?: string;
//   status?: string;
//   limit?: number;
//   orderBy?: string;
//   sortedBy?: SortOrder;
// };

// export type TypesQueryOptionsType = {
//   page?: number;
//   text?: string;
//   limit?: number;
//   orderBy?: string;
//   sortedBy?: SortOrder;
// };

// export type UserQueryOptionsType = {
//   page?: number;
//   shop_id?: number;
//   limit?: number;
//   orderBy?: string;
//   sortedBy?: SortOrder;
// };

// export type QueryOptionsType = {
//   page?: number;
//   text?: string;
//   shop_id?: number;
//   limit?: number;
//   orderBy?: string;
//   sortedBy?: SortOrder;
// };

export interface LanguageProps {
  language: LanguageType;
  etag: string;
}

export enum TextAlignEnum {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export enum BorderEnum {
  LEFT = 'left',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  ALL = 'all'
}

export interface PageBuilderStyles {
  Typography: {
    fontFamily: { value: string };
    fontWeight: { value: string };
    fontStyle: string;
    lineHeight: number;
    textTransform: string;
    textDecoration: string;
    textAlign: TextAlignEnum;
    letterSpacing: number;
    fontSize: string;
    color: string;
  };
  Border: {
    borderRadius: number;
    borderStyle: { value: string };
    borderWidth: number;
    borderColor: string;
    border: BorderEnum;
  };
  Spacing: {
    marginTop: number;
    marginLeft: number;
    marginRight: number;
    marginBottom: number;
    paddingTop: number;
    paddingRight: number;
    paddingLeft: number;
    paddingBottom: number;
  };
  Overlay: {
    overlayOpacity: number;
    overlayColor: string;
  };
  FlexAlignment: {
    justifyContent: { value: string; label: string };
    alignItems: { value: string; label: string };
  };
}
