import * as grpc from '@grpc/grpc-js';
import { StaffServiceRoutes } from '@lib/grpc-client';
import { Staff } from '@proto/generated/Staff';
import { promisify } from 'util';

const target = 'localhost:50051';

export class StaffService extends StaffServiceRoutes {
  constructor() {
    super(target, grpc.credentials.createInsecure());
  }

  public async getStaffInfo(
    id: string,
    aliasName: string
  ): Promise<{ data: Staff, error:Error }> {
    const staff = promisify(this.staffInfo).bind(this);
    return await staff({ id, aliasName })
      .then((data) => ({ data }))
      .catch((error) => ({ error }));
  }
}
