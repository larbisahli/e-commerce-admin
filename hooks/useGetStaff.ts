import { useQuery } from '@apollo/client';
import { StaffInfoContext } from '@contexts/staff.context';
import { STAFF_INFO } from '@graphql/staff';
import { useErrorLogger } from '@hooks/index';
import type { ClientType } from '@ts-types/custom.types';
import type { StaffType } from '@ts-types/generated';
import { useContext, useEffect } from 'react';

interface TStaff {
  staff: StaffType;
}

export function useGetStaff(client?: ClientType) {
  const { staffInfo, setStaffInfo } = useContext(StaffInfoContext);

  const staffId = client?.uid;

  const { error } = useQuery<TStaff>(STAFF_INFO, {
    variables: { id: staffId },
    skip: Boolean(!staffId) || !!(staffId && staffInfo?.id),
    onCompleted: (data: TStaff) => {
      const staff = data?.staff;
      console.log(':=====>', staff);
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
