import { useQuery } from '@apollo/client';
import { StaffInfoContext } from '@contexts/staff.context';
import { STAFF } from '@graphql/staff';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import { useContext, useEffect } from 'react';

interface TStaff {
  staff: StaffType;
}

export function useGetStaff(id?: string, rest?: { [key: string]: string }) {
  const { staffInfo, setStaffInfo } = useContext(StaffInfoContext);

  const { error } = useQuery<TStaff>(STAFF, {
    variables: { id },
    skip: Boolean(!id) || !!(id && staffInfo?.id),
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
  }, [rest?.csrfToken]);

  return { staffInfo, setStaffInfo };
}
