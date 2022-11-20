import { StaffInfoContext } from '@contexts/staff.context';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect } from 'react';

export function useGetStaff(client?: StaffType) {
  const { staffInfo, setStaffInfo } = useContext(StaffInfoContext);
  useErrorLogger(client?.csrfError);

  useEffect(() => {
    if (!isEmpty(client)) {
      console.log({ client });
      setStaffInfo(client);
    }
  }, [client, setStaffInfo]);

  return { staffInfo, setStaffInfo };
}
