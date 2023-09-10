/* eslint-disable no-unused-vars */

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}

export enum AttributeTypes {
  COLOR = 'color',
  TEXT = 'text'
}

export enum ErrorNames {
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  SERVER_ERROR = 'SERVER_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SOMETHING_HAPPENED = 'SOMETHING_HAPPENED',
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',
  USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST',
  BAD_REQUEST = 'BAD_REQUEST',
  FORBIDDEN = 'FORBIDDEN',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_NOT_ACTIVE = 'USER_NOT_ACTIVE'
}

export enum CookieNames {
  USER_TOKEN_NAME = '_uuid',
  CUSTOMER_SESSION_NAME = '_cuid',
  XSRF_TOKEN = 'xsrf-token'
}

export enum RateType {
  WEIGHT = 'weight',
  PRICE = 'price'
}

export enum ACTION_PRIVILEGES {
  READ = 'read',
  WRITE = 'write',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum RESOURCES {
  PHOTOS = 'photos',
  USER = 'user',
  CATEGORY = 'category',
  PRODUCT = 'product',
  TAG = 'tag',
  SUPPLIER = 'supplier',
  ATTRIBUTE = 'attribute',
  CUSTOMER = 'customer',
  COUPON = 'coupon',
  SHIPPING_ZONE = 'shippingZone',
  ORDER_STATUS = 'orderStatus',
  ORDER = 'order',
  ROLE = 'role',
  SLIDESHOW = 'slideshow'
}
