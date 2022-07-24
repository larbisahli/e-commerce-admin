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

  const { staffId, ...rest } = client;

  const { error } = useQuery<TStaff>(STAFF, {
    variables: { id: staffId },
    skip: Boolean(!staffId) || !!(staffId && staffInfo?.id),
    onCompleted: (data: TStaff) => {
      const staff = data?.staff;
      setStaffInfo({ ...staff, ...(rest ?? {}) });
    }
  });

  useErrorLogger(error);

  useEffect(() => {
    setStaffInfo((prev) => {
      return { ...prev, ...(rest ?? {}) };
    });
  }, [rest, setStaffInfo]);

  return { staffInfo, setStaffInfo };
}
