import { useErrorLogger } from '@hooks/index';
import { clientInfo, setClient } from '@store/client';
import type { AppDispatch, AppState } from '@store/index';
import type { UserType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function useGetClient(client?: UserType) {
  const userInfo = useAppSelector(clientInfo);
  const dispatch = useAppDispatch();
  useErrorLogger(client?.csrfError);
  console.log('================>>>>>>>',{client})
  useEffect(() => {
    if (!isEmpty(client)) {
      dispatch(setClient(client));
    }
  }, [client, dispatch]);
  return { userInfo };
}
