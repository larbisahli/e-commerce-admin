import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import { UserType } from '@ts-types/generated';

const initialState = {} as UserType;

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state: UserType, action: PayloadAction<UserType>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { setClient } = clientSlice.actions;

export const clientInfo = (state: AppState) => state.client;

export default clientSlice.reducer;
