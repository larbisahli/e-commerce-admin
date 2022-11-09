// Original file: proto/services.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { Staff as _Staff, Staff__Output as _Staff__Output } from './Staff';
import type {
  StaffRequest as _StaffRequest,
  StaffRequest__Output as _StaffRequest__Output
} from './StaffRequest';

export interface StaffServiceRoutesClient extends grpc.Client {
  StaffInfo(
    argument: _StaffRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
  StaffInfo(
    argument: _StaffRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
  StaffInfo(
    argument: _StaffRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
  StaffInfo(
    argument: _StaffRequest,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
  staffInfo(
    argument: _StaffRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
  staffInfo(
    argument: _StaffRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
  staffInfo(
    argument: _StaffRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
  staffInfo(
    argument: _StaffRequest,
    callback: grpc.requestCallback<_Staff__Output>
  ): grpc.ClientUnaryCall;
}

export interface StaffServiceRoutesHandlers
  extends grpc.UntypedServiceImplementation {
  StaffInfo: grpc.handleUnaryCall<_StaffRequest__Output, _Staff>;
}

export interface StaffServiceRoutesDefinition extends grpc.ServiceDefinition {
  StaffInfo: MethodDefinition<
    _StaffRequest,
    _Staff,
    _StaffRequest__Output,
    _Staff__Output
  >;
}
