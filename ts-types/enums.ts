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

export enum ModuleGroups {
  HEADER = 'Header',
  FOOTER = 'Footer',
  CART_DRAWER = 'CartDrawer',
  MENU_DRAWER = 'MenuDrawer',
  HOMEPAGE_CATEGORIES = 'HomepageCategories',
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
  INSTALL_PROMPT = 'InstallPrompt',
  CONTENT_NOT_FOUND = 'ContentNotFound',
  COOKIE_POPUP = 'CookiePopup',
  PROMO_BANNER = 'PromoBanner',
  OFFLINE_NOTICE = 'OfflineNotice',
  SUBSCRIPTION = 'Subscription',
  TEXT = 'Text',
  IMAGE = 'Image',
  IMAGE_BANNER = 'ImageBanner',
  VIDEO_BANNER = 'VideoBanner',
  HTML = 'Html',
  DIVIDER = 'Divider',
  SPACER = 'Spacer',
  LAYOUT = 'Layout',
  CATEGORY_LIST = 'CategoryList',
  CATEGORY_LIST_ITEM = 'CategoryListItem',
  PRODUCT_LIST = 'ProductList',
  CAROUSEL = 'Carousel',
  BUTTON = 'Button',
  EDITORIAL_TEXT = 'EditorialText',
  BANNER_WIDGET = 'BannerWidget'
}

export enum StoreBuilder {
  GALA_CMS_BUILDER = 'gala-cms-builder',
  GALA_CMS_BUILDER_PAGE = 'gala-cms-builder-page',
  GALA_CMS_BUILDER_LIBRARY = 'gala-cms-builder-library'
}

export enum StoreBuilderActions {
  EDIT_ACTION = 'EDIT_ACTION',
  DELETE_ACTION = 'DELETE_ACTION',
  ADD_NEW_BEFORE = 'ADD_NEW_BEFORE',
  ADD_NEW_AFTER = 'ADD_NEW_AFTER',
  DUPLICATE_BLOCK = 'DUPLICATE_BLOCK',
  SCROLL_TO_SECTION = 'SCROLL_TO_SECTION',
  BLOCK_SELECTION = 'BLOCK_SELECTION'
}

export enum StoreLayoutNames {
  HOMEPAGE = 'home-page',
  PRODUCT_PAGE = 'product-page',
  TERMS_OF_SERVICES = 'terms-of-service',
  CHECKOUT = 'checkout',
  CART = 'cart',
  CONTACT = 'contact',
  CATEGORY = 'category',
  PRODUCT = 'product',
  PRIVACY_POLICY = 'privacy-policy',
  RETURN_FAQ = 'returns-faq'
}

export enum PageLayoutBlocks {
  Header = 'jssHeader',
  Main = 'jssMain',
  Footer = 'jssFooter'
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

export enum offlinePaymentCodes {
  bankDeposit = 'bankdeposit',
  cod = 'cod',
  cheque = 'cheque',
  moneyOrder = 'moneyorder',
  inStore = 'instore'
}
