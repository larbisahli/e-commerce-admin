import { useQuery } from '@apollo/client';
import { MEDIA } from '@graphql/media';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { setFile } from '@store/files';
import type { AppDispatch, AppState } from '@store/index';
import { MediaType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

interface TMedia {
  media: {
    parent: MediaType;
    children: MediaType[];
  };
}

interface OptionsVariable {
  id: string;
  page: number;
  limit: number;
  etag: string;
}

export function useFiles({ id = null }: { id?: string | null }) {
  const { fileStore } = useAppSelector((state) => state.files);

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient();

  const { data, loading, error, refetch } = useQuery<TMedia, OptionsVariable>(
    MEDIA,
    {
      variables: {
        id,
        page: 1,
        limit: 10,
        etag: etag?.mediaEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(etag)
    }
  );

  const { media } = data ?? {};

  const dispatch = useAppDispatch();

  useErrorLogger(error);

  useEffect(() => {
    if (!isEmpty(media)) {
      dispatch(setFile(media));
    }
  }, [dispatch, media]);

  return {
    fileStore,
    refetch,
    loading: loading && isEmpty(media)
  };
}
