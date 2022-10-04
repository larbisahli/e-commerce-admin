import { useQuery } from '@apollo/client';
import { StaffInfoContext } from '@contexts/staff.context';
import { STAFF } from '@graphql/staff';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import { useContext, useEffect } from 'react';

interface TStaff {
  staff: StaffType;
}

interface ClientType {
  staffId: string;
  csrfToken?: string;
  csrfError?: any;
}

export function useGetStaff(client?: ClientType) {
  const { staffInfo, setStaffInfo } = useContext(StaffInfoContext);

  const staffId = client?.staffId;

  const { error } = useQuery<TStaff>(STAFF, {
    variables: { id: staffId },
    skip: Boolean(!staffId) || !!(staffId && staffInfo?.id),
    onCompleted: (data: TStaff) => {
      const staff = data?.staff;
      setStaffInfo(staff);
    }
  });

  useErrorLogger(error);

  useEffect(() => {
    const csrfToken = client?.csrfToken;
    console.log({ client });
    if (csrfToken) {
      setStaffInfo((prev) => {
        return { ...prev, csrfToken };
      });
    }
  }, [client, setStaffInfo]);

  return { staffInfo, setStaffInfo };
}
