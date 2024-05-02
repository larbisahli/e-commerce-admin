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
  USER = 'user',
  CATEGORY = 'category',
  PRODUCT = 'product',
  TAG = 'tag',
  TAX = 'tax',
  SUPPLIER = 'supplier',
  ATTRIBUTE = 'attribute',
  CUSTOMER = 'customer',
  COUPON = 'coupon',
  SHIPPING = 'shipping',
  ORDER_STATUS = 'orderStatus',
  ORDER = 'order',
  ROLE = 'role',
  SLIDERS = 'sliders',
  THEME = 'theme',
  STORE = 'store',
  MARKETPLACE = 'marketPlace',
  STORE_SETTINGS = 'storeSettings',
  PAGES = 'pages',
  MEDIA = 'media',
  MANUFACTURER = 'manufacturer',
  STORE_LANGUAGE = 'storeLanguage',
  STORE_BUILDER = 'storeBuilder',
  INTERNAL = 'internal'
}

export enum ModuleNames {
  HEADER = 'Header',
  PROMO_SLIDER = 'PromoSlider',
  FOOTER = 'Footer',
  HERO_BANNER = 'HeroBanner',
  CART_DRAWER = 'CartDrawer',
  MENU_DRAWER = 'MenuDrawer',
  HOMEPAGE_CATEGORIES = 'HomepageCategories',
  CATEGORIES_LIST = 'CategoryList',
  PRODUCT_CARD = 'ProductCard',
  PRODUCT_DETAILS = 'ProductDetails',
  LINKED_PRODUCTS = 'LinkedProducts',
  BREADCRUMB = 'Breadcrumb',
  CHECKOUT_BREADCRUMB = 'CheckoutBreadcrumb',
  CHECKOUT_FOOTER = 'CheckoutFooter',
  CHECKOUT_INFORMATION = 'CheckoutInformation',
  CHECKOUT_ITEMS = 'CheckoutItems',
  CHECKOUT_SHIPPING = 'CheckoutShipping',
  CHECKOUT_PAYMENT = 'CheckoutPayment',
  CHECKOUT_HEADER = 'CheckoutHeader',
  CHECKOUT_CART_ITEMS = 'CheckoutCartItems',
  CONFIRMATION_SUMMARY = 'ConfirmationSummary',
  ORDER_SUMMARY = 'OrderSummary',
  CATEGORY_DETAILS = 'CategoryDetails',
  PAGINATION = 'Pagination',
  MISCELLANEOUS = 'Miscellaneous',
  PAGE_CMS = 'PageCms',
  INSTALL_PROMPT = 'InstallPrompt',
  PRODUCT_NOT_FOUND = 'ProductNotFound',
  PRODUCT_LIST_WIDGET = 'ProductListWidget',
  COOKIE_POPUP = 'CookiePopup',
  PROMO_BANNER = 'PromoBanner',
  OFFLINE_NOTICE = 'OfflineNotice'
}

export enum StoreBuilder {
  GALA_CMS_BUILDER = 'gala-cms-builder'
}

export enum SignupMethods {
  NONE = 'NONE',
  GOOGLE = 'GOOGLE',
  EMAIL = 'EMAIL'
}

export enum DEVICE_VIEWS {
  DESKTOP = 'DESKTOP',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE'
}
