import { useQuery } from '@apollo/client';
import { StaffInfoContext } from '@contexts/staff.context';
import { STAFF } from '@graphql/staff';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import _ from 'lodash';
import { useContext } from 'react';
interface TStaff {
  staff: StaffType;
}

export function useGetStaff(id?: string) {
  const { staffInfo, setStaffInfo } = useContext(StaffInfoContext);

  const { error } = useQuery<TStaff>(STAFF, {
    variables: { id },
    skip: Boolean(!(_.isEmpty(staffInfo) && id)),
    onCompleted: (data: TStaff) => {
      const staff = data?.staff;
      setStaffInfo({ ...staff });
    }
  });

  useErrorLogger(error);

  return { staffInfo, setStaffInfo };
}
