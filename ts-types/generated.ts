/* eslint-disable no-unused-vars */
import type { CurrencyType, Nullable, Scalars } from './custom.types';
import { AttributeTypes, RateType } from './enums';

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  DISPLAY_ORDER = 'display_order'
}

export enum ProductStatus {
  Publish = 'publish',
  Draft = 'draft'
}

export enum ShippingType {
  Fixed = 'fixed',
  Free = 'free_shipping'
}

export enum CouponType {
  Fixed = 'fixed',
  Percentage = 'percentage',
  FreeShipping = 'free_shipping'
}

export enum PrivacyType {
  Public = 'public',
  Private = 'private'
}

export enum ProductType {
  Simple = 'simple',
  Variable = 'variable'
}

export enum SaveOptions {
  Default = 'default',
  SaveNew = 'save-new',
  SaveDuplicate = 'save-duplicate',
  SaveClose = 'save-close'
}

export declare enum WithdrawStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  OnHold = 'ON_HOLD',
  Rejected = 'REJECTED',
  Processing = 'PROCESSING'
}

export enum ShippingsActions {
  INSERT = 'INSERT',
  INIT = 'INIT',
  DELETE = 'DELETE',
  ADD_SHIPPING = 'ADD_SHIPPING',
  DELETE_SHIPPING = 'DELETE_SHIPPING',
  ADD_SHIPPING_PROVIDER = 'ADD_SHIPPING_PROVIDER',
  ADD_SHIPPING_ZONE = 'ADD_SHIPPING_ZONE',
  ADD_ZONE = 'ADD_ZONE',
  SHIPPING_PRICE = 'SHIPPING_PRICE',
  CLEAR_GLOBAL = 'CLEAR_GLOBAL',
  DELETE_SHIPPING_ZONE = 'DELETE_SHIPPING_ZONE'
}

export interface CreatedUpdatedByAt {
  createdAt?: Scalars['DateTime'];
  updatedAt?: Scalars['DateTime'];
  createdBy?: Nullable<{
    id: string;
    firstName: string;
    lastName: string;
    profile?: ImageType;
  }>;
  updatedBy?: Nullable<{
    id: string;
    firstName: string;
    lastName: string;
    profile?: ImageType;
  }>;
}

export interface RoleType {
  id?: string;
  name?: string;
}

export interface ThemeType {
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  themePath: Scalars['String'];
  previewImage: Scalars['String'];
  reviewsCount: Scalars['Int'];
  ratingStarCount: Scalars['Int'];
  price: Scalars['Int'];
  isFree: Scalars['Boolean'];
  installed: Scalars['Boolean'];
  isDefault: Scalars['Boolean'];
  version: Scalars['String'];
  updatedAt: Scalars['Date'];
}

export interface UserType extends CreatedUpdatedByAt {
  id: string;
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  profile: ImageType[];
  phoneNumber: string;
  role: RoleType;
  roleId?: number;
  active: boolean;
  isAdmin: boolean;
  csrfToken?: string;
  csrfError?: string;
  store?: SettingsType;
  // JWT
  uid?: string;
  iss?: string;
  iat?: number;
  exp?: number;
  ali?: string;
}

export interface Category extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  parentId?: Nullable<Scalars['Int']>;
  name?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  children?: Nullable<Array<CategoryRefLevel2>>;
  active?: Scalars['Boolean'];
  thumbnail?: ImageType[];
  level?: Scalars['Int'];
  hasChildren?: Scalars['Boolean'];
  includeInMenu?: Scalars['Boolean'];
  includeInHomePage?: Scalars['Boolean'];
  position?: Scalars['Int'];
  parent?: Nullable<CategoryRefLevel2>;
  urlKey?: Scalars['String'];
  metaRobots?: { value: Scalars['String'] };
  breadcrumbsPriority?: number;
  metaImage?: ImageType[];
  metaTitle?: Scalars['String'];
  metaKeywords?: Scalars['String'];
  metaDescription?: Scalars['String'];
  translated?: {
    name?: Scalars['String'];
    description?: Nullable<Scalars['String']>;
    metaTitle?: Scalars['String'];
    metaKeywords?: Scalars['String'];
    metaDescription?: Scalars['String'];
  };
}

// To prevent circular references
export interface CategoryRefLevel2 extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  parentId?: Nullable<Scalars['Int']>;
  name?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  active?: Scalars['Boolean'];
  thumbnail?: ImageType[];
  icon?: Nullable<Scalars['String']>;
  includeInMenu?: Scalars['Boolean'];
  level?: Scalars['Int'];
  children?: Nullable<Array<CategoryRefLevel3>>;
  parent?: Nullable<CategoryRefLevel3>;
}

// To prevent circular references
export interface CategoryRefLevel3 extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  parentId?: Nullable<Scalars['Int']>;
  name?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  active?: Scalars['Boolean'];
  thumbnail?: ImageType[];
  level?: Scalars['Int'];
  includeInMenu?: Scalars['Boolean'];
  // parent?: Nullable<Category>;
}

export interface ProductShippingInfo {
  id?: Scalars['Int'];
  productId?: Scalars['Int'];
  weight?: Scalars['Int'];
  weightUnit?: { unit: Scalars['String'] };
  dimensionWidth?: Scalars['Int'];
  dimensionHeight?: Scalars['Int'];
  dimensionLength?: Scalars['Int'];
  dimensionUnit?: { unit: Scalars['String'] };
}

export interface AttributeValue {
  id?: Scalars['Int'];
  attributeId?: Scalars['Int'];
  value?: Scalars['String'];
  name?: Nullable<Scalars['String']>;
  translated?: {
    value?: Scalars['String'];
    name?: Nullable<Scalars['String']>;
  };
}

export interface Attribute extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  name?: Scalars['String'];
  type?: AttributeTypes | { label: string; id: string };
  values?: AttributeValue[] | [];
  translated?: {
    name?: Scalars['String'];
  };
}

export interface Tag extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['Int']>;
  name?: Nullable<Scalars['String']>;
  translated?: {
    name?: Nullable<Scalars['String']>;
  };
}

export interface LanguageType extends CreatedUpdatedByAt {
  id: Scalars['Int'];
  remoteFilePath: Scalars['String'];
  name: Scalars['String'];
  localeId: Scalars['String'];
  direction: Scalars['String'];
  isDefault: Scalars['Boolean'];
  isSystem: Scalars['Boolean'];
  active: Scalars['Boolean'];
  translation: Scalars['JSON'];
}

export interface StoreViewType extends CreatedUpdatedByAt {
  id: Scalars['Int'];
  name: Scalars['String'];
  code: Scalars['String'];
  isDefault: Scalars['Boolean'];
  active: Scalars['Boolean'];
  language: LanguageType;
}

export interface OrderStatus extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['Int']>;
  label?: Nullable<Scalars['String']>;
  color?: Nullable<Scalars['String']>;
  status?: { value: string } | string;
  privacy?: PrivacyType;
  translated?: {
    label: string;
  };
}

export interface Coupon extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['Int']>;
  code?: Nullable<Scalars['String']>;
  // description: Scalars['String'];
  // image: Scalars['String'];
  discountValue?: Scalars['Int'];
  discountType?:
    | {
        value: CouponType;
      }
    | CouponType;
  timesUsed?: Nullable<Scalars['Int']>;
  maxUsage?: Nullable<Scalars['Int']>;
  orderAmountLimit?: Nullable<Scalars['Int']>;
  couponStartDate?: Nullable<Scalars['Date']>;
  couponEndDate?: Nullable<Scalars['Date']>;
}

export interface ShippingZoneType extends CreatedUpdatedByAt {
  shippingZone: {
    id?: Scalars['Int'];
    logo: ImageType[];
    name?: Scalars['String'];
    displayName?: Scalars['String'];
    active?: Scalars['Boolean'];
    freeShipping?: Scalars['Boolean'];
    deliveryTime: DeliveryTimeType;
    rateType?: { id?: number; name?: string; type?: RateType };
  };
  zones?: CountryType[];
  shippingRates?: ShippingRateType[];
}

export interface DeliveryTimeType extends CreatedUpdatedByAt {
  id: Scalars['Int'];
  name: Scalars['String'];
  unit: { unit: Scalars['String'] };
  min: Scalars['Int'];
  max: Scalars['Int'];
  translated: {
    name: Scalars['String'];
  };
}

export interface ShippingRateType {
  id?: Scalars['Int'];
  weightUnit?: { unit: Scalars['String'] };
  min?: Scalars['Int'];
  max?: Nullable<Scalars['Int']>;
  noMax?: Scalars['Boolean'];
  price?: Scalars['Int'];
  index?: Scalars['Int'];
}

export interface CountryType {
  id?: Scalars['Int'];
  zoneId?: Scalars['Int'];
  currency?: Scalars['String'];
  name?: Scalars['String'];
  phone_code?: Scalars['String'];
  iso2?: Scalars['String'];
  region?: Scalars['String'];
  subregion?: Scalars['String'];
}

export declare type ContactDetails = {
  socials?: Nullable<Array<Nullable<Social>>>;
  email?: Nullable<Scalars['String']>;
  number?: Nullable<Scalars['String']>;
  location?: Nullable<LocationInput>;
  website?: Nullable<Scalars['String']>;
};

export declare type Social = {
  type?: Nullable<Scalars['String']>;
  link?: Nullable<Scalars['String']>;
  icon?: Nullable<Scalars['String']>;
};

export declare type LocationInput = {
  lat?: Nullable<Scalars['Float']>;
  lng?: Nullable<Scalars['Float']>;
  city?: Nullable<Scalars['String']>;
  state?: Nullable<Scalars['String']>;
  country?: Nullable<Scalars['String']>;
  zip?: Nullable<Scalars['String']>;
  formattedAddress?: Nullable<Scalars['String']>;
};

export interface Product extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  slug?: Scalars['String'];
  name?: Scalars['String'];
  sku?: Nullable<Scalars['String']>;
  salePrice?: Scalars['Float'];
  comparePrice?: Scalars['Float'];
  buyingPrice?: Scalars['Float'];
  maxPrice?: Scalars['Float'];
  minPrice?: Scalars['Float'];
  quantity?: Scalars['Int'];
  inStock?: Nullable<Scalars['Boolean']>;
  description?: Nullable<Scalars['String']>;
  type?: { id: ProductType; name?: string };
  published?: Scalars['Boolean'];
  status?: ProductStatus;
  disableOutOfStock?: Scalars['Boolean'];
  freeShipping?: Scalars['Boolean'];
  displayProductMeasurements?: Scalars['Boolean'];
  includeInHomepage?: Scalars['Boolean'];
  trackInventory?: Scalars['Boolean'];
  translated?: {
    name?: Scalars['String'];
    description?: Nullable<Scalars['String']>;
    note?: Nullable<Scalars['String']>;
  };
  note?: Nullable<Scalars['String']>;
  thumbnail?: ImageType[];
  gallery?: ImageType[];
  categories?: Array<Category>;
  manufacturers?: Array<ManufacturerType>;
  suppliers?: Nullable<Array<Suppliers>>;
  tags?: Nullable<Array<Nullable<Tag>>>;
  attributes?: VariationType[];
  productShippingInfo?: ProductShippingInfo;
  variationOptions?: VariationOptionsType[];
  variations?: VariationType[];
  productSeo?: ProductSeo;
  relatedProducts?: Nullable<Array<Nullable<ProductRef>>>;
  upsellProducts?: Nullable<Array<Nullable<ProductRef>>>;
  crossSellProducts?: Nullable<Array<Nullable<ProductRef>>>;
  // [key: string]: any;
}

interface ProductRef {
  id?: Scalars['Int'];
  slug?: Scalars['String'];
  name?: Scalars['String'];
  sku?: Nullable<Scalars['String']>;
  salePrice?: Scalars['Float'];
  comparePrice?: Scalars['Float'];
  buyingPrice?: Scalars['Float'];
  maxPrice?: Scalars['Float'];
  minPrice?: Scalars['Float'];
  quantity?: Scalars['Int'];
}

export interface ProductSeo {
  id?: number;
  slug: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  metaImage: ImageType[];
  translated?: {
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
  };
}

export interface VariationType {
  id?: Scalars['ID'];
  attribute: Attribute;
  selectedValues?: Array<Nullable<AttributeValue>>;
  selectedValue?: Nullable<AttributeValue>;
  values?: AttributeValue;
}

export interface AttributeVariationType {
  id?: Scalars['ID'];
  attribute: Attribute;
  value: AttributeValue;
}

export interface VariationOptionsType {
  id?: Scalars['Int'];
  title: string;
  key?: string;
  isDisable?: boolean;
  active?: boolean;
  thumbnail: ImageType[];
  options: Scalars['Int'][];
  salePrice: Scalars['Float'];
  comparePrice: Scalars['Float'];
  buyingPrice: Scalars['Float'];
  quantity: Scalars['Int'];
  sku: Scalars['String'];
  weight?: Scalars['Int'];
  weightUnit?: { unit: Scalars['String'] };
  dimensionWidth?: Scalars['Int'];
  dimensionHeight?: Scalars['Int'];
  dimensionLength?: Scalars['Int'];
  dimensionUnit?: { unit: Scalars['String'] };
}

// Attachment
export interface ImageType {
  id?: Scalars['Int'];
  image?: Scalars['String'];
  placeholder?: Scalars['String'];
  isThumbnail?: boolean;
  createdAt?: Scalars['DateTime'];
  size?: Scalars['Int'];
}

export interface MediaType extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  parent?: MediaType;
  children?: MediaType[];
  name?: Scalars['String'];
  image?: ImageType[];
  itemsCount?: number;
}

export interface Suppliers extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  name?: Scalars['String'];
  company?: Nullable<Scalars['String']>;
  phoneNumber?: Nullable<Scalars['String']>;
  addressLine1?: Scalars['String'];
  addressLine2?: Nullable<Scalars['String']>;
  country?: Nullable<CountryType>;
  city?: Nullable<Scalars['String']> | { name: string };
  note?: Nullable<Scalars['String']>;
}

export interface ManufacturerType extends CreatedUpdatedByAt {
  id: Scalars['Int'];
  name?: Scalars['String'];
  link?: Nullable<Scalars['String']>;
  logo?: ImageType[];
  description?: Nullable<CountryType>;
  translated?: {
    name?: Scalars['String'];
    description?: Nullable<CountryType>;
  };
}

export interface HeroBannerType extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  url?: Nullable<Scalars['String']>;
  thumbnail?: ImageType[];
  title?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  btnLabel?: Scalars['String'];
  align?: 'left' | 'center' | 'right';
  styles?: {
    textColor?: string;
    btnBgc?: string;
    btnTextColor?: string;
  };
  translated?: {
    align?: 'left' | 'center' | 'right';
    title?: Scalars['String'];
    btnLabel?: Scalars['String'];
    description?: Nullable<Scalars['String']>;
  };
  position?: Scalars['Int'];
  published?: Scalars['Boolean'];
  status?: 'draft' | 'publish';
}

export interface TaxCountryType {
  name?: Scalars['String'];
  iso2?: Scalars['String'];
  rate?: Scalars['Int'];
  appliesTo?: {
    zipCode: string;
    zipCodeRange: string;
    entireCountry: boolean;
    state: string;
  };
}

export interface TaxType extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  name?: Scalars['String'];
  rate?: Scalars['Int'];
  isDefault?: Scalars['Boolean'];
  countries?: TaxCountryType[];
}

export interface PromoBannerType extends CreatedUpdatedByAt {
  id?: Scalars['Int'];
  animationSpeed: { value: number; name: string };
  delaySpeed: { value: number; name: string };
  backgroundColor: string;
  direction: 'RLT' | 'LTR';
  published?: Scalars['Boolean'];
  status?: 'draft' | 'publish';
  sliders?: {
    content: string;
    position?: Scalars['Int'];
  }[];
}

export interface SettingsType {
  logo?: ImageType[];
  favicon?: ImageType[];
  storeName?: string;
  storeEmail?: string;
  storeNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  alias?: string;
  published?: boolean;
  tier?: string;
  languages?: LanguageType[];
  webmanifest?: WebmanifestType;
  currencies?: {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
    is_default?: boolean;
  }[];
  systemCurrency?: {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
  };
  defaultCurrency?: {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
    is_default: boolean;
  };
  canonicalUrl?: string;
  socials?: {
    url: string;
    icon: {
      value: string;
      label?: string;
    };
  }[];
  maxCheckoutQuantity?: number;
  maxCheckoutAmount?: number;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: ImageType[];
    twitterHandle: string;
    twitterCardType: string;
    metaTags: string;
    canonicalUrl: string;
  };
  google?: {
    isEnabled: boolean;
    trackingId: string;
    isTrackVisitors: boolean;
    isTrackOrders: boolean;
    isTrackUserRegister: boolean;
    isTrackUserLogin: boolean;
    isTrackCheckoutOptions: boolean;
    isTrackProductAddToCart: boolean;
    isTrackProductRemoveToCart: boolean;
    isTrackCheckout: boolean;
  };
  facebook?: {
    isEnabled: boolean;
    appId: string;
    pageId: string;
  };
  tax: TaxType;
  maintenanceMode: boolean;
  maintenancePassword: number;
}

export interface WebmanifestType {
  name?: string;
  short_name?: string;
  description?: string;
  theme_color?: string;
  background_color?: string;
  start_url?: string;
  orientation?: { name: string };
  display?: { name: string };
  iarc_rating_id?: string;
  scope?: string;
}

export interface PageType {
  id: string;
  slug: string;
  name: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  ogMedia: ImageType[];
  translated: {
    name: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
  };
}

export interface FinalPrice {
  // currency?: { code: string }
  value: number;
}

export interface Summary {
  grandTotalInclTax: FinalPrice;
  grandTotalExclTax: FinalPrice;
  subtotalInclTax: FinalPrice;
  subtotalExclTax: FinalPrice;
  totalDiscount: FinalPrice;
  totalShippingInclTax: FinalPrice;
  totalShippingExclTax: FinalPrice;
}

export interface OrderType {
  orderNumber?: string;
  couponId?: string;
  customerId?: string;
  orderStatusId?: Nullable<string>;
  currency?: Nullable<CurrencyType>;
  paymentId?: string;
  orderGeo?: {
    ip?: string;
    city?: string;
    state?: string;
  };
  grandTotalExclTax: Summary['grandTotalExclTax'];
  grandTotalInclTax: Summary['grandTotalInclTax'];
  subtotalInclTax: Summary['subtotalInclTax'];
  subtotalExclTax: Summary['subtotalExclTax'];
  totalDiscount: Summary['totalDiscount'];
  totalQuantity?: number;
  orderApprovedAt?: Scalars['Date'];
  orderDeliveredCarrierDate?: Scalars['Date'];
  orderDeliveredCustomerDate?: Scalars['Date'];
}

// export declare type Address = {
//   id: Scalars['ID'];
//   title?: Nullable<Scalars['String']>;
//   default?: Nullable<Scalars['Boolean']>;
//   address?: Nullable<UserAddress>;
//   type?: Nullable<Scalars['String']>;
//   customer?: Nullable<User>;
// };

// export declare type UserAddress = {
//   country?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   street_address?: Maybe<Scalars['String']>;
// };

// export declare type User = {
//   id: Scalars['ID'];
//   name: Scalars['String'];
//   shops: [Shop];
//   managed_shop: Shop;
//   is_active: Boolean;
//   email: Scalars['String'];
//   created_at: Scalars['DateTime'];
//   updated_at: Scalars['DateTime'];
//   profile?: Maybe<Profile>;
//   address: Array<Address>;
//   orders?: Maybe<OrderPaginator>;
// };

// export declare type Profile = {
//   id: Scalars['ID'];
//   avatar?: Maybe<String>;
//   bio?: Maybe<Scalars['String']>;
//   contact?: Maybe<Scalars['String']>;
//   socials?: Maybe<Array<Maybe<Social>>>;
//   customer?: Maybe<User>;
// };

// export declare type Order = {
//   id: Scalars['ID'];
//   tracking_number: Scalars['String'];
//   customer_contact: Scalars['String'];
//   customer_id: Scalars['Int'];
//   customer?: Maybe<User>;
//   status: OrderStatus;
//   amount: Scalars['Float'];
//   sales_tax: Scalars['Float'];
//   total: Scalars['Float'];
//   paid_total: Scalars['Float'];
//   payment_id?: Maybe<Scalars['String']>;
//   payment_gateway?: Maybe<Scalars['String']>;
//   coupon?: Maybe<Coupon>;
//   discount?: Maybe<Scalars['Float']>;
//   delivery_fee?: Maybe<Scalars['Float']>;
//   delivery_time: Scalars['String'];
//   products: Array<Product>;
//   created_at: Scalars['DateTime'];
//   updated_at: Scalars['DateTime'];
//   billing_address?: Maybe<UserAddress>;
//   shipping_address?: Maybe<UserAddress>;
// };

// export declare type Variation = {
//   __typename?: 'Variation';
//   id?: Maybe<Scalars['ID']>;
//   title?: Maybe<Scalars['String']>;
//   price?: Maybe<Scalars['Float']>;
//   sku?: Maybe<Scalars['String']>;
//   is_disable?: Maybe<Scalars['Boolean']>;
//   sale_price?: Maybe<Scalars['Float']>;
//   quantity?: Maybe<Scalars['Int']>;
//   options?: Maybe<Array<Maybe<VariationOption>>>;
// };

// export declare type VariationOption = {
//   __typename?: 'VariationOption';
//   name?: Maybe<Scalars['String']>;
//   value?: Maybe<Scalars['String']>;
// };

// export declare type TaxInput = {
//   name?: Maybe<Scalars['String']>;
//   rate?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   country?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   priority?: Maybe<Scalars['Int']>;
//   on_shipping?: Maybe<Scalars['Boolean']>;
// };

// export declare type TaxUpdateInput = {
//   name?: Maybe<Scalars['String']>;
//   rate?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   country?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   priority?: Maybe<Scalars['Int']>;
//   on_shipping?: Maybe<Scalars['Boolean']>;
// };

// export declare type AddressInput = {
//   title: Scalars['String'];
//   default?: Nullable<Scalars['Boolean']>;
//   address: UserAddressInput;
//   type: Scalars['String'];
//   customer?: Nullable<ConnectBelongsTo>;
// };

// export declare type AttributeValueInput = {
//   id?: Maybe<Scalars['Int']>;
//   value: Scalars['String'];
//   meta?: Maybe<Scalars['String']>;
// };

// export declare type AttributeInput = {
//   name: Scalars['String'];
//   shop_id: Scalars['Int'];
//   values: AttributeValueInput;
// };

// export declare type CheckoutVerificationInput = {
//   amount: Scalars['Float'];
//   products: Array<ConnectProductOrderPivot>;
//   billing_address?: Maybe<UserAddressInput>;
//   shipping_address?: Maybe<UserAddressInput>;
// };

// export declare type ConnectProductOrderPivot = {
//   product_id: Scalars['ID'];
//   order_quantity?: Maybe<Scalars['Int']>;
//   unit_price?: Maybe<Scalars['Float']>;
//   subtotal?: Maybe<Scalars['Float']>;
// };

// export declare type VerifiedCheckoutData = {
//   total_tax: Scalars['Float'];
//   shipping_charge: Scalars['Float'];
//   unavailable_products: Array<Scalars['ID']>;
// };

// export type Tax = {
//   id?: Maybe<Scalars['ID']>;
//   name?: Maybe<Scalars['String']>;
//   rate?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   country?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   priority?: Maybe<Scalars['Int']>;
//   on_shipping?: Maybe<Scalars['Boolean']>;
// };

// export declare type CardInput = {
//   number: Scalars['String'];
//   expiryMonth: Scalars['String'];
//   expiryYear: Scalars['String'];
//   cvv: Scalars['String'];
//   email?: Maybe<Scalars['String']>;
// };

// export type PasswordChangeResponse = {
//   message?: Maybe<Scalars['String']>;
//   success?: Maybe<Scalars['Boolean']>;
// };

// export type ForgetPasswordInput = {
//   email: Scalars['String'];
// };

// export type VerifyForgetPasswordTokenInput = {
//   token: Scalars['String'];
//   email: Scalars['String'];
// };

// export type ResetPasswordInput = {
//   token: Scalars['String'];
//   email: Scalars['String'];
//   password: Scalars['String'];
// };

// export type SocialInput = {
//   type?: Maybe<Scalars['String']>;
//   link?: Maybe<Scalars['String']>;
// };

// export declare type Analytics = {
//   totalRevenue?: Maybe<Scalars['Float']>;
//   todaysRevenue?: Maybe<Scalars['Float']>;
//   totalOrders?: Maybe<Scalars['Int']>;
//   totalShops?: Maybe<Scalars['Int']>;
//   newCustomers?: Maybe<Scalars['Int']>;
//   totalYearSaleByMonth?: Maybe<Array<Maybe<TotalYearSaleByMonth>>>;
// };

// export declare type TotalYearSaleByMonth = {
//   total?: Maybe<Scalars['Float']>;
//   month?: Maybe<Scalars['String']>;
// };

// export declare type ApproveShopInput = {
//   id: Scalars['ID'];
//   admin_commission_rate: Scalars['Float'];
// };

// export declare type ApproveWithdrawInput = {
//   id: Scalars['ID'];
//   status: WithdrawStatus;
// };

// export declare type PaymentInfo = {
//   account?: Maybe<Scalars['String']>;
//   name?: Maybe<Scalars['String']>;
//   email?: Maybe<Scalars['String']>;
//   bank?: Maybe<Scalars['String']>;
// };

// export declare type PaymentInfoInput = {
//   account?: Maybe<Scalars['String']>;
//   name?: Maybe<Scalars['String']>;
//   email?: Maybe<Scalars['String']>;
//   bank?: Maybe<Scalars['String']>;
// };

// export declare type Balance = {
//   id?: Maybe<Scalars['ID']>;
//   admin_commission_rate?: Maybe<Scalars['Float']>;
//   shop?: Maybe<Shop>;
//   total_earnings?: Maybe<Scalars['Float']>;
//   withdrawn_amount?: Maybe<Scalars['Float']>;
//   current_balance?: Maybe<Scalars['Float']>;
//   payment_info?: Maybe<PaymentInfo>;
// };

// export declare type BalanceInput = {
//   id?: Maybe<Scalars['ID']>;
//   payment_info?: Maybe<PaymentInfoInput>;
// };

// export declare type Location = {
//   lat?: Maybe<Scalars['Float']>;
//   lng?: Maybe<Scalars['Float']>;
//   city?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   country?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   formattedAddress?: Maybe<Scalars['String']>;
// };

// export declare type ContactDetails = {
//   __typename?: 'ContactDetails';
//   socials?: Maybe<Array<Maybe<ShopSocials>>>;
//   contact?: Maybe<Scalars['String']>;
//   location?: Maybe<Location>;
//   website?: Maybe<Scalars['String']>;
// };
