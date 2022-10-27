import { StaffInfoContext } from '@contexts/staff.context';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import { useContext, useEffect } from 'react';

export function useGetStaff(client?: StaffType) {
  const { staffInfo, setStaffInfo } = useContext(StaffInfoContext);
  useErrorLogger(client?.csrfError);
  useEffect(() => {
    if (client) {
      setStaffInfo(client);
    }
  }, [client, setStaffInfo]);

  return { staffInfo, setStaffInfo };
}
