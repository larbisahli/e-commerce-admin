import { useErrorLogger } from '@hooks/index';
import type { AppDispatch, AppState } from '@store/index';
import { updateUser } from '@store/user';
import type { UserType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function useGetUser(client?: UserType) {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  useErrorLogger(client?.csrfError);

  useEffect(() => {
    if (!isEmpty(client)) {
      dispatch(updateUser(client));
    }
  }, [client, dispatch]);

  return { userInfo };
}
