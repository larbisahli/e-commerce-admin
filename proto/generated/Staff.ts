// Original file: proto/staffService.proto

import type { Role as _Role, Role__Output as _Role__Output } from './Role';
import type {
  Profile as _Profile,
  Profile__Output as _Profile__Output
} from './Profile';

export interface Staff {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  role?: _Role | null;
  profile?: _Profile | null;
  active?: boolean;
  isTenant?: boolean;
}

export interface Staff__Output {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: _Role__Output | null;
  profile: _Profile__Output | null;
  active: boolean;
  isTenant: boolean;
}
