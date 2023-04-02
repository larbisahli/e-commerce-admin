import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import { UserType } from '@ts-types/generated';

const initialState = {} as UserType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state: UserType, action: PayloadAction<UserType>) => {
      return action.payload;
    }
  }
});

export const { updateUser } = userSlice.actions;

export const userInfo = (state: AppState) => state.userInfo;

export default userSlice.reducer;
