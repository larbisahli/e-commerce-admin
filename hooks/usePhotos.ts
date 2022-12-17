import { useQuery } from '@apollo/client';
import { PhotosContext } from '@contexts/photos.context';
import { PHOTOS } from '@graphql/photo';
import { useErrorLogger } from '@hooks/index';
import { OrderBy, SortOrder } from '@ts-types/enums';
import type { ImageType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect, useMemo, useState } from 'react';

interface TPhotos {
  getPhotos: ImageType[];
  getPhotosCount: { count: number };
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

export function usePhotos({limit}:{limit: number}) {

  const { storePhotos, currentPage, photosCount, setPhotoContext } = useContext(PhotosContext);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);


  const findPage = (items:PhotosType[], currentPage: number)=> items?.find((({page}) => page === currentPage))

  const photos = useMemo(()=>{
    return findPage(storePhotos, currentPage) ?? {page: 1, total:0, items:[]}
  }, [storePhotos, currentPage])

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
    }
  });

  useErrorLogger(error);

  console.log('====>',{data, storePhotos, currentPage, photosCount})

  useEffect(() => {
    if(!isEmpty(data?.getPhotos)){
      // data?.getPhotosCount?.count
      setPhotoContext((prev) => {
        const PageExist = !isEmpty(findPage(prev.storePhotos, prev.currentPage))
        console.log({PageExist})
        return {
          ...prev,
          photosCount: data.getPhotosCount?.count,
          storePhotos: PageExist ? prev.storePhotos?.map((storePhoto)=>{
            if(storePhoto.page === currentPage){
              storePhoto.total = data.getPhotos?.length
              storePhoto.items = data.getPhotos
            }
            return storePhoto
          }): [...prev.storePhotos,
            {
              page: currentPage,
              total: data.getPhotos?.length,
              items: data.getPhotos
            }]
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setPhotoContext]);


  function handlePagination(currentPage: any) {
    setPhotoContext((prev)=>{
      return {
        ...prev,
        currentPage
      }
    })
    fetchMore({
      variables: {
        page: currentPage,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  }

  return { photos, currentPage, photosCount, loadingPhotos, handlePagination, setPhotoContext };
}