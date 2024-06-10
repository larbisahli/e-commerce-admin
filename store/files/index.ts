import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import { MediaType } from '@ts-types/generated';

interface FileType {
  parent: MediaType;
  children: MediaType[];
}

interface FilesState {
  fileStore: FileType;
}

const initialState = {
  fileStore: {
    parent: {} as MediaType,
    children: [] as MediaType[]
  }
};

export const FilesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFile: (
      state: FilesState,
      action: PayloadAction<{ parent: MediaType; children: MediaType[] }>
    ) => {
      state.fileStore.parent = action.payload.parent;
      state.fileStore.children = action.payload.children;
    }
  }
});

export const { setFile } = FilesSlice.actions;

export const files = (state: AppState) => state.files;

export default FilesSlice.reducer;
