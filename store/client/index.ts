import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import { EtagGroupsType, UserType } from '@ts-types/generated';

const initialState = {} as UserType;

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state: UserType, action: PayloadAction<UserType>) => {
      state = action.payload;
      return state;
    },
    setEtag: (
      state: UserType,
      action: PayloadAction<{ etag: EtagGroupsType }>
    ) => {
      const etag = action.payload.etag;
      state.store.etag = { ...state.store.etag, ...etag };
    }
  }
});

export const { setClient, setEtag } = clientSlice.actions;

export const clientInfo = (state: AppState) => state.client;

export default clientSlice.reducer;
