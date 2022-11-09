import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type {
  StaffServiceRoutesClient as _StaffServiceRoutesClient,
  StaffServiceRoutesDefinition as _StaffServiceRoutesDefinition
} from './StaffServiceRoutes';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  Role: MessageTypeDefinition;
  Staff: MessageTypeDefinition;
  StaffRequest: MessageTypeDefinition;
  StaffServiceRoutes: SubtypeConstructor<
    typeof grpc.Client,
    _StaffServiceRoutesClient
  > & { service: _StaffServiceRoutesDefinition };
}
