import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import { ImageType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

interface PhotosType {
  page: number;
  total: number;
  items: ImageType[];
}

interface FilesState {
  fileStore: PhotosType[];
  currentPage: number;
  fileCount: number;
}

const initialState = {
  fileStore: [],
  currentPage: 1,
  fileCount: 0
};

const findPage = (items: PhotosType[], currentPage: number) =>
  items?.find(({ page }) => page === currentPage);

export const FilesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (
      state: FilesState,
      action: PayloadAction<{ count: number; images: ImageType[] }>
    ) => {
      const PageExist = !isEmpty(findPage(state.fileStore, state.currentPage));

      const images = action.payload.images;

      (state.fileCount = action.payload.count),
        (state.fileStore = PageExist
          ? state.fileStore?.map((storePhoto) => {
              if (storePhoto.page === state.currentPage) {
                storePhoto.total = images?.length;
                storePhoto.items = images;
              }
              return storePhoto;
            })
          : [
              ...state.fileStore,
              {
                page: state.currentPage,
                total: images?.length,
                items: images
              }
            ]);
    },
    appendFile: (
      state: FilesState,
      action: PayloadAction<{ image: ImageType }>
    ) => {
      const image = action.payload.image;
      if (isEmpty(state.fileStore)) {
        state.fileStore = [
          {
            page: 1,
            total: 1,
            items: [image]
          }
        ];
      } else {
        state.fileStore?.map((storePhoto) => {
          if (storePhoto.page === state.currentPage) {
            const clonedItems = cloneDeep(storePhoto.items);
            storePhoto.items = [image, ...clonedItems];
            return storePhoto;
          }
          return storePhoto;
        });
      }
    },
    setCurrentPage: (
      state: FilesState,
      action: PayloadAction<{ currentPage: number }>
    ) => {
      state.currentPage = action.payload.currentPage;
    }
  }
});

export const { setFiles, appendFile, setCurrentPage } = FilesSlice.actions;

export const files = (state: AppState) => state.files;

export default FilesSlice.reducer;
