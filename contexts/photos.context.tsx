import type { ImageType } from '@ts-types/generated';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface Photos {
  storePhotos:{
    page: number
    total: number
    items: ImageType[]
  }[],
  currentPage: number,
  photosCount: number}

export interface State extends Photos {
  setPhotoContext: Dispatch<SetStateAction<Photos>>;
}

const initialState = {
  storePhotos: [],
  currentPage: 1,
  photosCount: 0,
  setPhotoContext: () => []
};

export const PhotosContext = React.createContext<State>(initialState);

PhotosContext.displayName = 'PhotosContext';

interface Props {
  children: React.ReactNode;
}

export const PhotosProvider: React.FC<Props> = (props) => {
  const [{storePhotos, currentPage, photosCount}, setPhotoContext] = useState<Photos>(
    {storePhotos:[], currentPage:1, photosCount: 0});
  return (
    <PhotosContext.Provider value={{ storePhotos, currentPage, photosCount, setPhotoContext }} {...props}/>
  );
};
