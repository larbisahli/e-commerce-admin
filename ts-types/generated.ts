/* eslint-disable no-unused-vars */
import type { Nullable, PrivilegesType, Scalars } from './custom.types';

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
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

export declare enum WithdrawStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  OnHold = 'ON_HOLD',
  Rejected = 'REJECTED',
  Processing = 'PROCESSING'
}

interface CreatedUpdatedByAt {
  created_at?: Scalars['DateTime'];
  updated_at?: Scalars['DateTime'];
  created_by?: Nullable<{
    id: string;
    first_name: string;
    last_name: string;
    profile_img?: string | null;
  }>;
  updated_by?: Nullable<{
    id: string;
    first_name: string;
    last_name: string;
    profile_img?: string | null;
  }>;
}

export interface RoleType extends CreatedUpdatedByAt {
  id?: string;
  role_name?: string;
  privileges?: PrivilegesType[];
}

export interface StaffType extends CreatedUpdatedByAt {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_img: Nullable<Scalars['String']>;
  phone_number: Nullable<Scalars['Int']>;
  role: RoleType;
  role_id?: number;
  active: boolean;
}

export interface Category extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  parent_id?: Nullable<Scalars['ID']>;
  category_name?: Scalars['String'];
  category_description?: Nullable<Scalars['String']>;
  children?: Nullable<Array<Category>>;
  active?: Scalars['Boolean'];
  image_path?: Nullable<string>;
  icon?: Nullable<Scalars['String']>;
  has_children?: Scalars['Boolean'];
}

export interface Suppliers extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
}

export interface ProductShippingOptions {
  id?: Scalars['ID'];
  product_id?: Scalars['ID'];
  weight?: Scalars['Int'];
  weight_unit?: Scalars['String'] | { unit: Scalars['String'] };
  volume?: Scalars['Int'];
  volume_unit?: Scalars['String'] | { unit: Scalars['String'] };
  dimension_width?: Scalars['Int'];
  dimension_height?: Scalars['Int'];
  dimension_depth?: Scalars['Int'];
  dimension_unit?: Scalars['String'] | { unit: Scalars['String'] };
}

export interface ProductShippings {
  id?: Scalars['ID'];
  key?: Scalars['ID'];
  shipping_id?: Scalars['ID'];
  shipping_price?: Scalars['Float'];
  shipping_provider?: Shipping;
}
export interface AttributeValue {
  id?: Scalars['ID'];
  attribute_id?: Scalars['ID'];
  attribute_value?: Scalars['String'];
  color?: Nullable<Scalars['String']>;
}

export interface Attribute extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  attribute_name?: Scalars['String'];
  attribute_values?: AttributeValue[] | [];
}

export interface Tag extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['ID']>;
  tag_name?: Nullable<Scalars['String']>;
  icon?: Nullable<Scalars['String']>;
}

export interface OrderStatus extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['ID']>;
  status_name?: Nullable<Scalars['String']>;
  color?: Nullable<Scalars['String']>;
  privacy?: PrivacyType;
}

export interface Coupon extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['ID']>;
  code?: Nullable<Scalars['String']>;
  discount_value?: Scalars['Int'];
  discount_type?:
    | {
        value: CouponType;
      }
    | CouponType;
  times_used?: Nullable<Scalars['Int']>;
  max_usage?: Nullable<Scalars['Int']>;
  order_amount_limit?: Nullable<Scalars['Int']>;
  coupon_start_date?: Nullable<Scalars['Date']>;
  coupon_end_date?: Nullable<Scalars['Date']>;
}

export interface Shipping extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['ID']>;
  shipper_name?: Nullable<Scalars['String']>;
  active?: Nullable<Scalars['Boolean']>;
  shipper_icon_path?: Nullable<Scalars['String']>;
}

export interface StoreSettingsOptions {
  store_name?: Nullable<Scalars['String']>;
  store_address: Scalars['String'];
  currency?: Nullable<Scalars['String']>;
  max_order_amount?: Nullable<Scalars['Float']>;
  max_checkout_quantity?: Nullable<Scalars['Int']>;
  logo?: Nullable<Scalars['String']>;
  favicon?: Nullable<Scalars['String']>;
  contactDetails?: Nullable<ContactDetails>;
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
  id: Scalars['ID'];
  slug: Scalars['String'];
  product_name: Scalars['String'];
  sku?: Nullable<Scalars['String']>;
  sale_price?: Scalars['Float'];
  compare_price?: Scalars['Float'];
  buying_price?: Scalars['Float'];
  quantity?: Scalars['Int'];
  short_description?: Nullable<Scalars['String']>;
  product_description?: Scalars['String'];
  published?: Scalars['Boolean'];
  status?: 'draft' | 'publish';
  disable_out_of_stock?: Scalars['Boolean'];
  note?: Nullable<Scalars['String']>;
  image?: Array<Scalars['String']> | Scalars['String'];
  gallery?: Array<Nullable<Scalars['String']>>;
  categories?: Array<Category>;
  suppliers?: Nullable<Array<Nullable<Suppliers>>>;
  variations?: Nullable<Array<Nullable<AttributeValue>>>;
  tags?: Nullable<Array<Nullable<Tag>>>;
  shippings?: Nullable<Array<Nullable<ProductShippings>>>;
  product_shipping_options?: ProductShippingOptions;
  // [key: string]: any;
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

// export declare type OrderStatus = {
//   id: Scalars['ID'];
//   name: Scalars['String'];
//   color: Scalars['String'];
//   serial: Scalars['Int'];
//   created_at: Scalars['DateTime'];
//   updated_at: Scalars['DateTime'];
// };

// export declare type Coupon = {
//   id: Scalars['ID'];
//   code: Scalars['String'];
//   description: Scalars['String'];
//   orders: Array<Order>;
//   type: Scalars['String'];
//   image: Scalars['String'];
//   amount: Scalars['Float'];
//   active_from: Scalars['DateTime'];
//   expire_at: Scalars['DateTime'];
//   created_at: Scalars['DateTime'];
//   updated_at: Scalars['DateTime'];
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

// export declare type VariationInput = {
//   id?: Maybe<Scalars['ID']>;
//   title?: Maybe<Scalars['String']>;
//   sku?: Maybe<Scalars['String']>;
//   is_disable?: Maybe<Scalars['Boolean']>;
//   sale_price?: Maybe<Scalars['Float']>;
//   price?: Maybe<Scalars['Float']>;
//   quantity?: Maybe<Scalars['Int']>;
//   options?: Maybe<Array<Maybe<VariationOptionInput>>>;
// };

// export declare type VariationOption = {
//   __typename?: 'VariationOption';
//   name?: Maybe<Scalars['String']>;
//   value?: Maybe<Scalars['String']>;
// };

// export declare type VariationOptionInput = {
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

// export declare type ShippingInput = {
//   name: Scalars['String'];
//   amount: Scalars['Float'];
//   is_global?: Maybe<Scalars['Boolean']>;
//   type: ShippingType;
// };

// export declare type ShippingUpdateInput = {
//   name?: Maybe<Scalars['String']>;
//   amount?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   type?: ShippingType;
// };

// export declare type Attachment = {
//   thumbnail?: Maybe<Scalars['String']>;
//   original?: Maybe<Scalars['String']>;
//   id?: Maybe<Scalars['ID']>;
// };

// export declare type AddressInput = {
//   title: Scalars['String'];
//   default?: Nullable<Scalars['Boolean']>;
//   address: UserAddressInput;
//   type: Scalars['String'];
//   customer?: Nullable<ConnectBelongsTo>;
// };

// export declare type UserAddressInput = {
//   country?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   street_address?: Maybe<Scalars['String']>;
// };

// export declare type ConnectBelongsTo = {
//   connect?: Maybe<Scalars['ID']>;
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

// export declare type AttributeValueCreateInput = {
//   value: Scalars['String'];
//   meta: Scalars['String'];
//   attribute_id?: Scalars['ID'];
// };

// export declare type AttributeBelongTo = {
//   connect: Scalars['ID'];
// };

// export declare type AttributeValueUpdateInput = {
//   value?: Maybe<Scalars['String']>;
//   meta?: Maybe<Scalars['String']>;
//   attribute_id?: Scalars['ID'];
// };

// export declare type ConnectTypeBelongsTo = {
//   connect?: Maybe<Scalars['ID']>;
// };

// export declare type AttachmentInput = {
//   thumbnail?: Maybe<Scalars['String']>;
//   original?: Maybe<Scalars['String']>;
//   id?: Maybe<Scalars['ID']>;
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

// export type Shipping = {
//   id?: Maybe<Scalars['ID']>;
//   name?: Maybe<Scalars['String']>;
//   amount?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   type?: ShippingType;
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

// export declare type CouponInput = {
//   code: Scalars['String'];
//   type: CouponType;
//   amount: Scalars['Float'];
//   description?: Maybe<Scalars['String']>;
//   image?: Maybe<AttachmentInput>;
//   active_from: Scalars['DateTime'];
//   expire_at: Scalars['DateTime'];
// };

// export declare type CouponUpdateInput = {
//   code?: Maybe<Scalars['String']>;
//   type?: Maybe<CouponType>;
//   amount?: Maybe<Scalars['Float']>;
//   description?: Maybe<Scalars['String']>;
//   image?: Maybe<AttachmentInput>;
//   active_from?: Maybe<Scalars['DateTime']>;
//   expire_at?: Maybe<Scalars['DateTime']>;
// };

// export declare type Order = {
//   tracking_number: Scalars['String'];
//   customer_id: Scalars['Int'];
//   status: Scalars['Int'];
//   products: Array<ConnectProductOrderPivot>;
//   amount: Scalars['Float'];
//   sales_tax?: Maybe<Scalars['Float']>;
//   total: Scalars['Float'];
//   paid_total: Scalars['Float'];
//   payment_id?: Maybe<Scalars['String']>;
//   payment_gateway: Scalars['String'];
//   coupon_id?: Maybe<Scalars['Int']>;
//   discount?: Maybe<Scalars['Float']>;
//   delivery_fee?: Maybe<Scalars['Float']>;
//   delivery_time: Scalars['String'];
//   card?: Maybe<CardInput>;
//   billing_address?: Maybe<UserAddressInput>;
//   shipping_address?: Maybe<UserAddressInput>;
// };

// export declare type CardInput = {
//   number: Scalars['String'];
//   expiryMonth: Scalars['String'];
//   expiryYear: Scalars['String'];
//   cvv: Scalars['String'];
//   email?: Maybe<Scalars['String']>;
// };

// export declare type OrderStatusInput = {
//   name: Scalars['String'];
//   color: Scalars['String'];
//   serial: Scalars['Int'];
// };

// export declare type OrderStatusUpdateInput = {
//   id: Scalars['ID'];
//   name: Scalars['String'];
//   color: Scalars['String'];
//   serial: Scalars['Int'];
// };

// export declare type Product = {
//   name: Scalars['String'];
//   type_id: Scalars['String'];
//   price: Scalars['Float'];
//   sale_price?: Maybe<Scalars['Float']>;
//   quantity: Scalars['Int'];
//   unit: Scalars['String'];
//   description?: Maybe<Scalars['String']>;
//   categories?: Maybe<Array<Scalars['ID']>>;
//   variations?: Maybe<Array<AttributeProductPivot>>;
//   in_stock?: Maybe<Scalars['Boolean']>;
//   is_taxable?: Maybe<Scalars['Boolean']>;
//   sku?: Maybe<Scalars['String']>;
//   gallery?: Maybe<Array<Maybe<AttachmentInput>>>;
//   image?: Maybe<AttachmentInput>;
//   status?: Maybe<ProductStatus>;
//   height?: Maybe<Scalars['String']>;
//   length?: Maybe<Scalars['String']>;
//   width?: Maybe<Scalars['String']>;
// };

// export declare type AttributeProductPivot = {
//   id: Scalars['ID'];
//   price?: Maybe<Scalars['Float']>;
// };

// export declare type ProfileInput = {
//   avatar?: Maybe<Scalars['String']>;
//   bio?: Maybe<Scalars['String']>;
//   socials?: Maybe<Array<Maybe<SocialInput>>>;
//   contact?: Maybe<Scalars['String']>;
//   customer?: Maybe<ConnectBelongsTo>;
// };

// export declare type LoginInput = {
//   email: Scalars['String'];
//   password: Scalars['String'];
// };

// export declare type RegisterInput = {
//   email: Scalars['String'];
//   password: Scalars['String'];
//   name: Scalars['String'];
//   shop_id?: Scalars['Int'];
//   permission: Permission;
// };

// export type ChangePasswordInput = {
//   oldPassword: Scalars['String'];
//   newPassword: Scalars['String'];
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

// export type User = {
//   name?: Maybe<Scalars['String']>;
//   email: Scalars['String'];
//   password: Scalars['String'];
//   profile?: Maybe<UserProfileInput>;
//   address?: Maybe<Array<Maybe<UserAddressUpsertInput>>>;
// };

// export type SocialInput = {
//   type?: Maybe<Scalars['String']>;
//   link?: Maybe<Scalars['String']>;
// };

// export type UserProfileInput = {
//   id: Scalars['ID'];
//   avatar?: Maybe<AttachmentInput>;
//   bio?: Maybe<Scalars['String']>;
//   socials?: Maybe<Array<Maybe<SocialInput>>>;
//   contact?: Maybe<Scalars['String']>;
// };

// export type UserAddressUpsertInput = {
//   title: Scalars['String'];
//   default?: Maybe<Scalars['Boolean']>;
//   address: UserAddressInput;
//   type: Scalars['String'];
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

// export type CreateTypeInput = {
//   name: Scalars['String'];
//   gallery?: Maybe<Array<AttachmentInput>>;
//   icon?: Maybe<Scalars['String']>;
//   banner_text?: Maybe<Scalars['String']>;
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

// export declare type AddStaffInput = {
//   email: Scalars['String'];
//   password: Scalars['String'];
//   name: Scalars['String'];
//   shop_id: Scalars['Int'];
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
