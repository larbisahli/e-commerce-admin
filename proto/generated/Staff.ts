// Original file: proto/staffService.proto

import type { Role as _Role, Role__Output as _Role__Output } from './Role';

export interface Staff {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  role?: _Role | null;
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
  active: boolean;
  isTenant: boolean;
}
