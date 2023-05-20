import { useQuery } from '@apollo/client';
import { PHOTOS } from '@graphql/photo';
import { useErrorLogger } from '@hooks/index';
import { appendFile, setCurrentPage, setFiles } from '@store/files';
import type { AppDispatch, AppState } from '@store/index';
import { OrderBy, SortOrder } from '@ts-types/enums';
import type { ImageType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useMemo, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export { appendFile };
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

interface TPhotos {
  photos: ImageType[];
  photoCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

interface PhotosType {
  page: number;
  total: number;
  items: ImageType[];
}

export function useFiles({ limit }: { limit: number }) {
  const { fileStore, currentPage, fileCount } = useAppSelector(
    (state) => state.files
  );

  const dispatch = useAppDispatch();

  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const findPage = (items: PhotosType[], currentPage: number) =>
    items?.find(({ page }) => page === currentPage);

  const photos = useMemo(() => {
    return findPage(fileStore, currentPage) ?? { page: 1, total: 0, items: [] };
  }, [fileStore, currentPage]);

  const {
    data,
    loading: loadingPhotos,
    error,
    fetchMore
  } = useQuery<TPhotos, OptionsVariable>(PHOTOS, {
    variables: {
      page: currentPage,
      limit,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  useErrorLogger(error);

  const { photos: images = [], photoCount: { count = 0 } = {} } = data ?? {};

  useEffect(() => {
    if (!isEmpty(images)) {
      dispatch(setFiles({ count, images }));
    }
  }, [images, count, dispatch]);

  function handlePagination(currentPage: any) {
    dispatch(setCurrentPage({ currentPage }));
    fetchMore({
      variables: {
        page: currentPage,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  }

  return {
    photos,
    currentPage,
    photosCount: fileCount,
    loadingPhotos,
    handlePagination
  };
}
