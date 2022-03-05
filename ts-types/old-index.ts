import type {
  ADMIN_TYPE,
  CREATE_TYPE,
  DELETE_TYPE,
  READ_TYPE,
  UPDATE_TYPE
} from '../interfaces/constants';

export type User = {
  id: number;
  name: string;
};

export type SvgProps = {
  width?: number;
  height?: number;
  fill?: string;
  title?: string;
  className?: string;
};

export interface GuideIState {
  show: boolean;
  mode: number;
}

export interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}
// handleChange(event: DOMEvent<HTMLInputElement>) {
//   this.setState({ value: event.target.value });
// }

export interface staffType {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_img: string;
  roles: string[];
}
export interface authPageProps {
  token: string;
  staff: staffType;
}
export interface AttributeType {
  attribute_uid: string;
  product_uid: string;
  attribute_name: string;
  options: OptionType[];
}

export interface OptionType {
  option_uid: string | null;
  option_name: string | null;
  additional_price: number;
  color_hex: string | null;
}
export interface ProductType {
  product_uid?: string;
  category_uid: string;
  account_uid: string;
  title: string;
  price: number;
  discount: number;
  warehouse_location: string;
  product_description: string;
  short_description: string;
  inventory: number;
  product_weight: number;
  is_new: boolean;
  note: string;
  thumbnail:
    | {
        image_uid: string;
        image: string;
        display_order: number;
      }[]
    | null;
  gallery:
    | {
        image_uid: string;
        image: string;
        display_order: number;
      }[]
    | null;
}
export interface CategoryType {
  category_uid?: string;
  category_name: string;
  category_description: string;
  is_active: boolean;
  display_order?: number;
}

// ----------------

export type PrivilegesType = (
  | READ_TYPE
  | CREATE_TYPE
  | UPDATE_TYPE
  | DELETE_TYPE
  | ADMIN_TYPE
)[];
export type ActionsType = [
  READ_TYPE | CREATE_TYPE | UPDATE_TYPE | DELETE_TYPE,
  ADMIN_TYPE?
];
export interface AuthType {
  account_uid: string;
  is_active: boolean;
  privileges: PrivilegesType;
}
export interface GraphQLContextType {
  cookies: unknown;
  account_uid: string;
  privileges: PrivilegesType;
  redis: unknown;
  ip: string;
}

export interface QueryPermissionType {
  privileges: PrivilegesType;
  actions: ActionsType;
}
