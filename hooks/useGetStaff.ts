import { useErrorLogger } from '@hooks/index';
import type { AppDispatch, AppState } from '@store/index';
import { updateStaff } from '@store/staff';
import type { StaffType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function useGetStaff(client?: StaffType) {
  const staffInfo = useAppSelector((state) => state.staffInfo);
  const dispatch = useAppDispatch();

  useErrorLogger(client?.csrfError);

  useEffect(() => {
    if (!isEmpty(client)) {
      dispatch(updateStaff(client));
    }
  }, [client, dispatch]);

  return { staffInfo };
}
