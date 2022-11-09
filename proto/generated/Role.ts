// Original file: proto/staffService.proto

export interface Role {
  id?: number;
  roleName?: string;
  privileges?: string[];
}

export interface Role__Output {
  id: number;
  roleName: string;
  privileges: string[];
}
